import { Loaded } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import Station from 'src/station/entities/station.entity'
import User from 'src/user/entities/user.entity'
import { CreateRatingDto } from './dto/create-rating.dto'
import { UpdateRatingDto } from './dto/update-rating.dto'
import Rating from './entities/rating.entity'
import Comment from 'src/comment/entities/comment.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@ApiTags("rating")
export class RatingService {
    constructor(readonly em: EntityManager) { }

    /**
     * Creates a new rating
     * @param createRatingDto The create object for a rating
     * @returns The created rating
     */
    @ApiOperation({ summary: "This endpoint creates a new rating." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ description: "A new rating" })
    async create(createRatingDto: CreateRatingDto): Promise<Loaded<Rating>> {
        const oRating = new Rating(createRatingDto)
        oRating.created_by = this.em.getReference(User, createRatingDto.created_by)
        oRating.station = this.em.getReference(Station, createRatingDto.station)
        oRating.comment = this.em.getReference(Comment, createRatingDto.comment)
        await this.em.persistAndFlush(oRating)
        return oRating
    }

    /**
     * Fetches all ratings
     * @returns An array of all ratings
     */
    @ApiOperation({ summary: "This endpoint retrieves all ratings." })
    @ApiResponse({ status: 200, description: "Success" })
    async findAll(): Promise<Loaded<Array<Rating>>> {
        return await this.em.find(Rating, {})
    }

    /**
     * Fetches a single rating by its id
     * @param id The id of a rating
     * @returns A single rating
     */
    @ApiOperation({ summary: "This endpoint retrieves a single rating by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    async findOne(id: number): Promise<Loaded<Rating>> {
        const rating = await this.em.findOne(Rating, { id })
        if (!rating) {
            throw new NotFoundException()
        }
        return rating
    }

    /**
     * Performs complete replacement on a rating object
     * @param id The id of a rating
     * @param updateRatingDto The update object of a rating
     * @returns The updated rating
     */
    @ApiOperation({ summary: "This endpoint performs complete replacement on a rating's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async put(id: number, updateRatingDto: UpdateRatingDto): Promise<Loaded<Rating>> {
        const oRating = await this.findOne(id)
        const { rating, station, comment } = updateRatingDto
        if (!rating || !station || !comment) {
            throw new BadRequestException()
        }
        oRating.rating = rating
        oRating.station = this.em.getReference(Station, station)
        oRating.comment = this.em.getReference(Comment, comment)
        await this.em.flush()
        return oRating
    }

    /**
     * Performs partial replacement on a rating object
     * @param id The id of a rating
     * @param updateRatingDto The update object of a rating
     * @returns The updated rating
     */
    @ApiOperation({ summary: "This endpoint performs partial replacement on a rating's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async patch(id: number, updateRatingDto: UpdateRatingDto): Promise<Loaded<Rating>> {
        const oRating = await this.findOne(id)
        const { rating, station, comment } = updateRatingDto
        if (!rating && !station && !comment) {
            throw new BadRequestException()
        }
        if (rating) {
            oRating.rating = rating
        }
        if (station) {
            oRating.station = this.em.getReference(Station, station)
        }
        if (comment) {
            oRating.comment = this.em.getReference(Comment, comment)
        }
        await this.em.flush()
        return oRating
    }

    /**
     * Deletes a rating
     * @param id The id of a rating
     * @returns The deleted rating
     */
    @ApiOperation({ summary: "This endpoint deletes a rating." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async remove(id: number): Promise<Loaded<Rating>> {
        const oRating = await this.findOne(id)
        await this.em.removeAndFlush(oRating)
        return oRating
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the user who created the rating
     * @param id The id of a rating
     * @returns The user who created the rating
     */
    @ApiOperation({ summary: "This endpoint gets the creator of a rating." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getCreator(id: number): Promise<Loaded<User>> {
        const rating = await this.em.findOne(Rating, { id }, { populate: ['created_by'] });
        if (!rating) {
            throw new NotFoundException();
        }
        return rating.created_by;
    }

    /**
     * Gets the station the rating was created for
     * @param id The id of a rating
     * @returns The station the rating was created for
     */
    @ApiOperation({ summary: "This endpoint gets the station a rating was made on." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getStation(id: number): Promise<Loaded<Station>> {
        const rating = await this.em.findOne(Rating, { id }, { populate: ['station'] });
        if (!rating) {
            throw new NotFoundException();
        }
        return rating.station;
    }

    /**
     * Fetches the comment the rating was created for
     * @param id The id of a rating
     * @returns The comment a rating was created for
     */
    @ApiOperation({ summary: "This endpoint gets the comment a rating was made on." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getComment(id: number): Promise<Loaded<Comment>> {
        const rating = await this.em.findOne(Rating, { id }, { populate: ['comment'] });
        if (!rating) {
            throw new NotFoundException();
        }
        return rating.comment;
    }
}
