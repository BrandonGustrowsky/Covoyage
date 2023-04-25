import { Collection, Loaded } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import Comment from 'src/comment/entities/comment.entity'
import Station from 'src/station/entities/station.entity'
import User from 'src/user/entities/user.entity'
import { CreateForumDto } from './dto/create-forum.dto'
import { UpdateForumDto } from './dto/update-forum.dto'
import Forum from './entities/forum.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@ApiTags("forum")
export class ForumService {
    constructor(readonly em: EntityManager) { }
    /**
     * Creates a new forum
     * @param createForumDto the create object of a forum
     * @returns The created forum
     */
    @ApiOperation({ summary: "This endpoint creates a new forum." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(createForumDto: CreateForumDto) {
        const { comments, station, created_by } = createForumDto
        const forum = new Forum(createForumDto)
        if (comments) {
            for (let comment of comments) {
                forum.comments.add(this.em.getReference(Comment, comment))
            }
        }
        forum.station = this.em.getReference(Station, station)
        forum.created_by = this.em.getReference(User, created_by)
        await this.em.persistAndFlush(forum);
        return forum;
    }

    /**
     * Fetches all forums
     * @returns All forums
     */
    @ApiOperation({ summary: "This endpoint retrieves all forums." })
    @ApiResponse({ status: 200, description: "Success" })
    async findAll() {
        return await this.em.find(Forum, {})
    }

    /**
     * Fetches one forum by its id
     * @param id The id of a single forum
     * @returns a single forum
     */
    @ApiOperation({ summary: "This endpoint retrieves a single forum by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    async findOne(id: string) {
        const forum = await this.em.findOne(Forum, { id })
        if (!forum) {
            throw new NotFoundException()
        }
        return forum
    }

    /**
     * Performs complete replacement of a forum
     * @param id The id of a forum
     * @param UpdateForumDto The object to update the forum with
     * @returns An updated forum
     */
    @ApiOperation({ summary: "This endpoint performs complete replacement on a forum's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async put(id: string, updateForumDto: UpdateForumDto) {
        const forum = await this.em.findOne(Forum, { id })
        if (!forum) {
            throw new NotFoundException()
        }
        const { title, description, comments, station } = updateForumDto
        if (!title || !description || !comments || !station) {
            throw new BadRequestException()
        }
        forum.title = title
        forum.description = description
        for (let comment of comments) {
            forum.comments.add(this.em.getReference(Comment, comment))
        }
        forum.station = this.em.getReference(Station, station)
        await this.em.flush()
        return forum
    }

    /**
     * Performs partial replacement on a forum
     * @param id the id of af forum
     * @param updateForumDto the update object for a forum
     * @returns the upated forum
     */
    @ApiOperation({ summary: "This endpoint performs partial replacement on a forum's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async patch(id: string, updateForumDto: UpdateForumDto) {
        const forum = await this.em.findOne(Forum, { id })
        if (!forum) {
            throw new NotFoundException()
        }
        const { title, description, comments, station } = updateForumDto
        if (!title && !description && !comments && !station) {
            throw new BadRequestException()
        }
        if (title) {
            forum.title = title
        }
        if (description) {
            forum.description = description
        }
        if (comments) {
            for (let comment of comments) {
                forum.comments.add(this.em.getReference(Comment, comment))
            }
        }
        if (station) {
            forum.station = this.em.getReference(Station, station)
        }
        await this.em.flush()
        return forum
    }

    /**
     * Deletes a fourm
     * @param id the id of a forum
     * @returns the deleted forum 
     */
    @ApiOperation({ summary: "This endpoint deletes a forum." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async remove(id: string) {
        const forum = await this.findOne(id)
        await this.em.removeAndFlush(forum)
        return forum
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the collection of a forum's comments
     * @param id The id of a forum
     * @returns A collection of comments
     */
    @ApiOperation({ summary: "This endpoint gets the comments on a forum." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getComments(id: string): Promise<Loaded<Collection<Comment>>> {
        const forum = await this.em.findOne(Forum, { id }, { populate: ['comments'] })
        if (!forum) {
            throw new NotFoundException()
        }
        return forum.comments
    }

    /**
     * Fetches the station a forum was created in
     * @param id The id of a forum
     * @returns The station a forum was created in
     */
    @ApiOperation({ summary: "This endpoint gets the station a forum was made under." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getStation(id: string): Promise<Loaded<Station>> {
        const forum = await this.em.findOne(Forum, { id }, { populate: ['station'] })
        if (!forum) {
            throw new NotFoundException()
        }
        return forum.station
    }

    /**
     * Fetches the user who created the forum
     * @param id The id of a forum
     * @returns The user who created the forum
     */
    @ApiOperation({ summary: "This endpoint gets the creator of a forum." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getForumCreator(id: string): Promise<Loaded<User>> {
        const forum = await this.em.findOne(Forum, { id }, { populate: ['created_by'] })
        if (!forum) {
            throw new NotFoundException()
        }
        return forum.created_by
    }
}
