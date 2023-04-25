import { Collection, Loaded } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import Rating from 'src/rating/entities/rating.entity'
import User from 'src/user/entities/user.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import Forum from 'src/forum/entities/forum.entity'
import Comment from './entities/comment.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@ApiTags("comment")
export class CommentService {
    constructor(readonly em: EntityManager) { }

    /**
     * Creates a new comment
     * @param createCommentDto The create object of a comment
     * @returns The created comment
     */
    @ApiOperation({ summary: "This endpoint creates a new comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(createCommentDto: CreateCommentDto) {
        const { ratings, created_by, forum, parent, children } = createCommentDto
        const comment = new Comment(createCommentDto)

        if (ratings) {
            for (let rating of ratings) {
                comment.ratings.add(this.em.getReference(Rating, rating))
            }
        }

        if (children) {
            for (let child of children) {
                comment.children.add(this.em.getReference(Comment, child))
            }
        }

        comment.forum = this.em.getReference(Forum, forum)
        comment.parent = this.em.getReference(Comment, parent)
        comment.created_by = this.em.getReference(User, created_by)
        await this.em.persistAndFlush(comment);
        return comment
    }

    /**
     * Fetches all comments
     * @returns All comments
     */
    @ApiOperation({ summary: "This endpoint retrieves all comments." })
    @ApiResponse({ status: 200, description: "Success" })
    async findAll() {
        return await this.em.find(Comment, {})
    }

    /**
     * Fetches a comment by its id
     * @param id The id of a comment
     * @returns A single comment
     */
    @ApiOperation({ summary: "This endpoint retrieves a single comment by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    async findOne(id: number) {
        const comment = await this.em.findOne(Comment, { id })
        if (!comment) {
            throw new NotFoundException()
        }
        return comment
    }

    /**
     * Performs total replacement on the fields of a comment
     * @param id The id of a comment
     * @param updateCommentDto The update object of a comment
     * @returns An updated comment
     */
    @ApiOperation({ summary: "This endpoint performs complete replacement on a comment's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async put(id: number, updateCommentDto: UpdateCommentDto) {
        const comment = await this.findOne(id)
        const { contents, ratings, forum, children, parent } = updateCommentDto
        if (!contents || !ratings || !forum || !children || !parent) {
            throw new BadRequestException()
        }
        comment.contents = contents
        for (let rating of ratings) {
            comment.ratings.add(this.em.getReference(Rating, rating))
        }
        for (let child of children) {
            comment.children.add(this.em.getReference(Comment, child))
        }
        comment.forum = this.em.getReference(Forum, forum)
        comment.parent = this.em.getReference(Comment, parent)
        await this.em.flush()
        return comment
    }

    /**
     * Performs partial replacement on the fields of a comment
     * @param id The id of a comment
     * @param updateCommentDto The update object of a comment
     * @returns An updated comment
     */
    @ApiOperation({ summary: "This endpoint performs partial replacement on a comment's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async patch(id: number, updateCommentDto: UpdateCommentDto) {
        const comment = await this.findOne(id)
        const { contents, ratings, created_by, forum, children, parent } = updateCommentDto
        if (!contents && !ratings && !created_by && !forum && !children && !parent) {
            throw new BadRequestException()
        }
        if (contents) {
            comment.contents = contents
        }
        if (ratings) {
            for (let rating of ratings) {
                comment.ratings.add(this.em.getReference(Rating, rating))
            }
        }
        if (children) {
            for (let child of children) {
                comment.children.add(this.em.getReference(Comment, child))
            }
        }
        if (forum) {
            comment.forum = this.em.getReference(Forum, forum)
        }
        if (parent) {
            comment.parent = this.em.getReference(Comment, parent)
        }

        await this.em.flush()
        return comment
    }

    /**
     * Deletes a comment
     * @param id The id of a comment
     * @returns The deleted comment
     */
    @ApiOperation({ summary: "This endpoint deletes a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async remove(id: number) {
        const comment = await this.findOne(id)
        await this.em.removeAndFlush(comment)
        return comment
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the ratings on a single comment
     * @param id The id of a comment
     * @returns The ratings on a single comment
     */
    @ApiOperation({ summary: "This endpoint gets the ratings on a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getRatings(id: number): Promise<Loaded<Collection<Rating>>> {
        // return await findOneWithPopulate(id, this.em.findOne, Comment, 'ratings')
        const comment = await this.em.findOne(Comment, { id }, { populate: ['ratings'] });
        if (!comment) {
            throw new NotFoundException();
        }
        return comment.ratings;
    }

    /**
     * Gets the user who created the comment
     * @param id The id of a comment
     * @returns The user who created the comment
     */
    @ApiOperation({ summary: "This endpoint gets the creator of a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getCommentCreator(id: number): Promise<Loaded<User>> {
        const comment = await this.em.findOne(Comment, { id }, { populate: ['created_by'] });
        if (!comment) {
            throw new NotFoundException();
        }
        return comment.created_by;
    }

    /**
     * Gets the forum a commment was posted on
     * @param id The id of a comment
     * @returns The forum a comment was posted on
     */
    @ApiOperation({ summary: "This endpoint gets the forum a comment was made on." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getForum(id: number): Promise<Loaded<Forum>> {
        const comment = await this.em.findOne(Comment, { id }, { populate: ['forum'] })
        if (!comment) {
            throw new NotFoundException()
        }
        return comment.forum;
    }

    /**
     * Gets the children comments of a single comment
     * @param id The id of a comment
     * @returns A collection containing the child comments of a comment
     */
    @ApiOperation({ summary: "This endpoint gets the child comments of a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getChildren(id: number): Promise<Loaded<Collection<Comment>>> {
        const comment = await this.em.findOne(Comment, { id }, { populate: ['children'] });
        if (!comment) {
            throw new NotFoundException()
        }
        return comment.children;
    }
    @ApiOperation({ summary: "This endpoint gets the parent comment of a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getParent(id: number): Promise<Loaded<Comment>> {
        const comment = await this.em.findOne(Comment, { id }, { populate: ['parent'] });
        if (!comment || !comment.parent) {
            throw new NotFoundException()
        }
        return comment.parent;
    }
}
