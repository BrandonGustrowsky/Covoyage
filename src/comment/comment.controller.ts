import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('comment')
@ApiTags("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    /**
     * Creates a new comment
     * @param createCommentDto The create object of a comment
     * @returns The created comment
     */
    @Post()
    @ApiOperation({summary: "This endpoint creates a new comment."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto)
    }

    /**
     * Fetches all comments
     * @returns All comments
     */
    @Get()
    @ApiOperation({ summary: "This endpoint retrieves all comments."})
    @ApiResponse({ status: 200, description: "Success" })
    findAll() {
        return this.commentService.findAll()
    }

    /**
     * Fetches a comment by its id
     * @param id The id of a comment
     * @returns A single comment
     */
    @Get(':id')
    @ApiOperation({ summary: "This endpoint retrieves a single comment by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id)
    }

    /**
     * Performs total replacement on the fields of a comment
     * @param id The id of a comment
     * @param updateCommentDto The update object of a comment
     * @returns An updated comment
     */
    @Put(':id')
    @ApiOperation({ summary: "This endpoint performs complete replacement on a comment's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    put(
        @Param('id') id: string,
        @Body() UpdateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.put(+id, UpdateCommentDto)
    }

    /**
     * Performs partial replacement on the fields of a comment
     * @param id The id of a comment
     * @param updateCommentDto The update object of a comment
     * @returns An updated comment
     */
    @Patch(':id')
    @ApiOperation({ summary: "This endpoint performs partial replacement on a comment's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    patch(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.patch(+id, updateCommentDto)
    }

     /**
     * Deletes a comment
     * @param id The id of a comment
     * @returns The deleted comment
     */
    @Delete(':id')
    @ApiOperation({ summary: "This endpoint deletes a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id)
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the ratings on a single comment
     * @param id The id of a comment
     * @returns The ratings on a single comment
     */
    @Get('/ratings/:id')
    @ApiOperation({ summary: "This endpoint gets the ratings on a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getRatings(@Param('id') id: string) {
        return this.commentService.getRatings(+id)
    }

    /**
     * Gets the user who created the comment
     * @param id The id of a comment
     * @returns The user who created the comment
     */
    @Get('/creator/:id')
    @ApiOperation({ summary: "This endpoint gets the creator of a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getCommentCreator(@Param('id') id: string) {
        return this.commentService.getCommentCreator(+id)
    }

    /**
     * Gets the forum a commment was posted on
     * @param id The id of a comment
     * @returns The forum a comment was posted on
     */
    @Get('/forum/:id')
    @ApiOperation({ summary: "This endpoint gets the forum a comment was made on." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getForum(@Param('id') id: string) {
        return this.commentService.getForum(+id)
    }

    /**
     * Gets the children comments of a single comment
     * @param id The id of a comment
     * @returns A collection containing the child comments of a comment
     */
    @Get('/children/:id')
    @ApiOperation({ summary: "This endpoint gets the child comments of a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getChildren(@Param('id') id: string) {
        return this.commentService.getChildren(+id)
    }

    /**
     * Gets the parent comment of the given comment
     * @param id The id of a comment
     * @returns The parent comment of the given comment
     */
    @Get('/parent/:id')
    @ApiOperation({ summary: "This endpoint gets the parent comment of a comment." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getParent(@Param('id') id: string) {
        return this.commentService.getParent(+id)
    }
}
