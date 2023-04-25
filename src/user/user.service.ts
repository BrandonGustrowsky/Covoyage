import { Collection, Loaded } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import Forum from 'src/forum/entities/forum.entity'
import Payment from 'src/payment/entities/payment.entity'
import Rating from 'src/rating/entities/rating.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import User from './entities/user.entity'
import Comment from 'src/comment/entities/comment.entity'
import Station from 'src/station/entities/station.entity'
import Pump from 'src/pump/entities/pump.entity'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@ApiTags("user")
export class UserService {
    constructor(private readonly em: EntityManager) {}

    /**
     * Creates a new user
     * @param createUserDto The create object of a user
     * @returns The newly created user
     */
    @ApiOperation({ summary: "This endpoint creates a new user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(createUserDto: CreateUserDto): Promise<Loaded<User>> {
        const user = new User(createUserDto)
        await this.em.persistAndFlush(user)
        return user
    }

    /**
     * Fetches all users
     * @returns An array of all users wrapped in a Promise
     */
    @ApiOperation({ summary: "Retrieves all users" })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiBody({
        // description: "Returns an array of user entities.",
        type: CreateUserDto,
    })
    async findAll(): Promise<Loaded<Array<User>>> {
        return await this.em.find(User, {})
    }
    
    /**
     * Finds a user by their id
     * @param id The id of a user
     * @returns A single user
     */
    @ApiOperation({ summary: "Retrives a single user by their id "})
    @ApiResponse({ status: 200, description: "Success" })
    async findOne(id: string): Promise<Loaded<User>> {
        const user = await this.em.findOne(User, { id: id })
        if (!user) {
            throw new NotFoundException()
        }
        return user
    }

    /**
     * Updates a user with total replacement
     * @param id The id of a user
     * @param updateUserDto An object containing user properties
     * @returns The updated user
     */
    @ApiOperation({ summary: "Performs complete replacement of a user's properties "})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async put(id: string, updateUserDto: UpdateUserDto): Promise<Loaded<User>> {
        const user = await this.em.findOne(User, { id })
        if (!user) {
            throw new NotFoundException()
        }
        const { username, email, phone, password, ratings, stations, comments, pumps, forums } = updateUserDto
        if (!username || !email || !phone || !password || !ratings || !stations || !pumps || !comments || !forums) {
            throw new BadRequestException()
        }
        user.username = username
        user.email = email
        user.phone = phone
        user.password = password
        for (let station of stations) {
            user.stations.add(this.em.getReference(Station, station))
        }
        for (let rating of ratings) {
            user.ratings.add(this.em.getReference(Rating, rating))
        }
        for (let comment of comments) {
            user.comments.add(this.em.getReference(Comment, comment))
        }
        for (let pump of pumps) {
            user.pumps.add(this.em.getReference(Pump, pump))
        }
        for (let forum of forums) {
            user.forums.add(this.em.getReference(Forum, forum))
        }
        await this.em.persistAndFlush(user)
        return user
    }

    /**
     * Updates a user without total replacement
     * @param id The id of a user
     * @param updateUserDto An object containing user properties
     * @returns The updated user
     */
    @ApiOperation({ summary: "This endpoint performs partial replacement on a user's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async patch(id: string, updateUserDto: UpdateUserDto): Promise<Loaded<User>> {
        const user = await this.em.findOne(User, { id })
        if (!user) {
            throw new NotFoundException()
        }
        const { username, email, phone, password, ratings, stations, comments, pumps, forums } = updateUserDto
        if (!username && !email && !phone && !password && !ratings && !stations && !pumps && !comments && !forums) {
            throw new BadRequestException()
        }
        if (username) {
            user.username = username
        }
        if (email) {
            user.email = email
        }
        if (phone) {
            user.phone = phone
        }
        if (password) {
            user.password = password
        }
        if(stations) {
            for (let station of stations) {
                user.stations.add(this.em.getReference(Station, station))
            }
        }
        if (pumps) {
            for (let pump of pumps) {
                user.pumps.add(this.em.getReference(Pump, pump))
            }
        }
        if (ratings) {
            for (let rating of ratings) {
                user.ratings.add(this.em.getReference(Rating, rating))
            }
        }
        if (comments) {
            for (let comment of comments) {
                user.comments.add(this.em.getReference(Comment, comment))
            }
        }
        if (forums) {
            for (let forum of forums) {
                user.forums.add(this.em.getReference(Forum, forum))
            }
        }
        await this.em.persistAndFlush(user)
        return user
    }

    /**
     * Deletes a user
     * @param id 'The id of a user'
     * @returns The deleted user
     */
    @ApiOperation({ summary: "This endpoint deletes a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async remove(id: string): Promise<Loaded<User>> {
        const user = await this.em.findOne(User, { id })
        if (!user){
            console.log("In if");
            throw new NotFoundException()
        }
        this.em.removeAndFlush(user)
        return user
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Gets all the ratings a user has given
     * @param id The id of a user
     * @returns The ratings a user has given
     */
    @ApiOperation({ summary: "This endpoint gets all the ratings made by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getRatings(id: string): Promise<Loaded<Collection<Rating>>> {
        const user = await this.em.findOne(User, { id }, { populate: ['ratings'] });
        if (!user) {
            throw new NotFoundException();
        }
        return user.ratings;
    }

    /**
     * Gets all the stations a user has given
     * @param id The id of a user
     * @returns The stations a user has given
     */
    @ApiOperation({ summary: "This endpoint gets all the stations made by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getStations(id: string): Promise<Loaded<Collection<Station>>> {
        const user = await this.em.findOne(User, { id }, { populate: ['stations'] });
        if (!user) {
            throw new NotFoundException();
        }
        return user.stations;
    }

    /**
     * Gets all the pumps a user has given
     * @param id The id of a user
     * @returns The pumps] a user has given
     */
    @ApiOperation({ summary: "This endpoint gets all the pumps made by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getPumps(id: string): Promise<Loaded<Collection<Pump>>> {
        const user = await this.em.findOne(User, { id }, { populate: ['pumps'] });
        if (!user) {
            throw new NotFoundException();
        }
        return user.pumps;
    }

    /**
     * Gets all the comments a user has created
     * @param id The id of a user
     * @returns The comments a user has created
     */
    @ApiOperation({ summary: "This endpoint gets all the comments created by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getComments(id: string): Promise<Loaded<Collection<Comment>>> {
        const user = await this.em.findOne(User, { id }, { populate: ['comments'] });
        if (!user) {
            throw new NotFoundException();
        }
        return user.comments;
    }

    /**
     * Gets all the forums a user has created
     * @param id The id of a user
     * @returns All the forums a user has created
     */
    @ApiOperation({ summary: "This endpoint retrieves all forums created by a user."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getForums(id: string): Promise<Loaded<Collection<Forum>>> {
        const user = await this.em.findOne(User, { id }, { populate: ['forums'] });
        if (!user) {
            throw new NotFoundException();
        }
        return user.forums;
    }

    /**
     * Gets all the payment types a user has created
     * @param id The id of a user
     * @returns All the payment types a user has created
     */
    @ApiOperation({ summary: "This endpoint retrieves all payment types created by a user."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getPaymentTypes(id: string): Promise<Loaded<Collection<Payment>>> {
        const user = await this.em.findOne(User, { id }, { populate: ['payment_types'] });
        if (!user) {
            throw new NotFoundException();
        }
        return user.payment_types;
    }
}
