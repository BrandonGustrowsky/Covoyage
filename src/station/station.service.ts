import { Collection, Loaded } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import Forum from 'src/forum/entities/forum.entity'
import Pump from 'src/pump/entities/pump.entity'
import Rating from 'src/rating/entities/rating.entity'
import { CreateStationDto } from './dto/create-station.dto'
import { UpdateStationDto } from './dto/update-station.dto'
import Station from './entities/station.entity'
import User from 'src/user/entities/user.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@ApiTags("station")
export class StationService {
    constructor(readonly em: EntityManager) { }

    /**
     * Creates a new station
     * @param createStationDto The new station object
     * @returns the new station
     */
    @ApiOperation({ summary: "This endpoint creates a new station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(createStationDto: CreateStationDto): Promise<Loaded<Station>> {
        const station = new Station(createStationDto);
        if (createStationDto.ratings) {
            for (let rating of createStationDto.ratings) {
                station.ratings.add(this.em.getReference(Rating, rating))
            }
        }
        station.created_by = this.em.getReference(User, createStationDto.created_by)
        if (createStationDto.forums) {
            for (let forum of createStationDto.forums) {
                station.forums.add(this.em.getReference(Forum, forum))
            }
        }
        if (createStationDto.pumps) {
            for (let pump of createStationDto.pumps) {
                station.pumps.add(this.em.getReference(Pump, pump))
            }
        }
        await this.em.persistAndFlush(station);
        return station;
    }

    /**
     * Fetches all stations
     * @returns All stations
     */
    @ApiOperation({ summary: "This endpoint retrieves all stations." })
    @ApiResponse({ status: 200, description: "Success" })
    async findAll(): Promise<Loaded<Array<Station>>> {
        return await this.em.find(Station, {})
    }

    /**
     * Fetches a station by their id
     * @param id The id of a station
     * @returns A single station
     */
    @ApiOperation({ summary: "This endpoint retrieves a single user by their id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    async findOne(id: string): Promise<Loaded<Station>> {
        const station = await this.em.findOne(Station, { id })
        if (!station) {
            throw new NotFoundException()
        }
        return station
    }

    /**
     * Updates a station with total replacement
     * @param id The id of a station
     * @param updateStationDto The update object of a station
     * @returns The updated station
     */
    @ApiOperation({ summary: "This endpoint performs complete replacement on a station's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async put(id: string, updateStationDto: UpdateStationDto): Promise<Loaded<Station>> {
        const station = await this.em.findOne(Station, { id })
        if (!station) {
            throw new NotFoundException()
        }
        const { name, location, restroom_count, ratings, forums, pumps, } = updateStationDto
        if (!name || !location || !restroom_count || !ratings || !forums || !pumps) {
            throw new BadRequestException()
        }
        station.name = name
        station.location = location
        station.restroom_count = restroom_count

        for (let rating of ratings) {
            station.ratings.add(this.em.getReference(Rating, rating))
        }

        for (let forum of forums) {
            station.forums.add(this.em.getReference(Forum, forum))
        }
        for (let pump of pumps) {
            station.pumps.add(this.em.getReference(Pump, pump))
        }
        await this.em.persistAndFlush(station)
        return station
    }

    /**
     * Performs partial replacement on a station's fields
     * @param id The id of a station
     * @param updateStationDto The update object of a station
     * @returns The updated station
     */
    @ApiOperation({ summary: "This endpoint performs partial replacement on a station's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async patch(id: string, updateStationDto: UpdateStationDto): Promise<Loaded<Station>> {
        const station = await this.em.findOne(Station, { id })
        if (!station) {
            throw new NotFoundException()
        }
        const { name, location, restroom_count, ratings, forums, pumps } = updateStationDto
        if (!name && !location && !restroom_count && !ratings && !forums && !pumps) {
            throw new BadRequestException()
        }
        if (name) {
            station.name = name
        }
        if (location) {
            station.location = location
        }
        if (restroom_count) {
            station.restroom_count = restroom_count
        }
        // for (let rating of ratings) {
        //     station.ratings.add(this.em.getReference(Rating, rating))
        // }



        if (ratings) {
            for (let rating of ratings) {
                station.ratings.add(this.em.getReference(Rating, rating))
            }
        }
        if (forums) {
            for (let forum of forums) {
                station.forums.add(this.em.getReference(Forum, forum))
            }
        }
        if (pumps) {
            for (let pump of pumps) {
                station.pumps.add(this.em.getReference(Pump, pump))
            }
        }
        await this.em.persistAndFlush(station)
        return station
    }

    /**
     * Deletes a station
     * @param id The id of a station
     * @returns The deleted station
     */
    @ApiOperation({ summary: "This endpoint deletes a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async remove(id: string): Promise<Loaded<Station>> {
        const station = await this.em.findOne(Station, { id })
        if (!station) {
            throw new NotFoundException()
        }
        await this.em.removeAndFlush(station)
        return station
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Gets all forums about a single station
     * @param id The id of a station
     * @returns All the forums created for that station
     */
    @ApiOperation({ summary: "This endpoint gets all the forums made in a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getForums(id: string): Promise<Loaded<Collection<Forum>>> {
        // Documentation on 'populate': https://mikro-orm.io/docs/entity-manager#fetching-entities-with-entitymanager
        const station = await this.em.findOne(Station, { id }, { populate: ['forums'] })
        if (!station) {
            throw new NotFoundException()
        }
        return station.forums
    }

    /**
     * Gets creator of a single station
     * @param id The id of a station
     * @returns All the forums created for that station
     */
    @ApiOperation({ summary: "This endpoint gets the creator of a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getCreator(id: string): Promise<Loaded<User>> {
        // Documentation on 'populate': https://mikro-orm.io/docs/entity-manager#fetching-entities-with-entitymanager
        const station = await this.em.findOne(Station, { id }, { populate: ['created_by'] })
        if (!station) {
            throw new NotFoundException()
        }
        return station.created_by;
    }

    /**
     * Returns all ratings of a provided station
     * @param id The id of a station
     * @returns All the ratings for the provided station
     */
    @ApiOperation({ summary: "This endpoing gets all the ratings made on a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getRatings(id: string): Promise<Loaded<Collection<Rating>>> {
        const station = await this.em.findOne(Station, { id }, { populate: ['ratings'] })
        if (!station) {
            throw new NotFoundException()
        }
        return station.ratings
    }

    /**
     * Fetches all pumps on a single station
     * @param id The id of a station
     * @returns All the pumps for a provided station
     */
    @ApiOperation({ summary: "This endpoing gets all the pumps a station has." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getPumps(id: string): Promise<Loaded<Collection<Pump>>> {
        const station = await this.em.findOne(Station, { id }, { populate: ['pumps'] })
        if (!station) {
            throw new NotFoundException()
        }
        return station.pumps
    }
}
