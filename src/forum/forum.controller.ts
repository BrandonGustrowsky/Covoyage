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
import { ForumService } from './forum.service'
import { CreateForumDto } from './dto/create-forum.dto'
import { UpdateForumDto } from './dto/update-forum.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('forum')
@ApiTags("forum")
export class ForumController {
    constructor(private readonly forumService: ForumService) {}

    /**
     * Creates a new forum
     * @param createForumDto the create object of a forum
     * @returns The created forum
     */
    @Post()
    @ApiOperation({summary: "This endpoint creates a new forum."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    create(@Body() createForumDto: CreateForumDto) {
        return this.forumService.create(createForumDto)
    }

    /**
     * Fetches all forums
     * @returns All forums
     */
    @Get()
    @ApiOperation({ summary: "This endpoint retrieves all forums."})
    @ApiResponse({ status: 200, description: "Success" })
    findAll() {
        return this.forumService.findAll()
    }

    /**
     * Fetches one forum by its id
     * @param id The id of a single forum
     * @returns a single forum
     */
    @Get(':id')
    @ApiOperation({ summary: "This endpoint retrieves a single forum by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    findOne(@Param('id') id: string) {
        return this.forumService.findOne(id)
    }
    
    /**
     * Performs complete replacement of a forum
     * @param id The id of a forum
     * @param UpdateForumDto The object to update the forum with
     * @returns An updated forum
     */
    @Put(':id')
    @ApiOperation({ summary: "This endpoint performs complete replacement on a forum's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    put(@Param('id') id: string, @Body() UpdateForumDto: UpdateForumDto) {
        return this.forumService.put(id, UpdateForumDto)
    }

    /**
     * Performs partial replacement on a forum
     * @param id the id of af forum
     * @param updateForumDto the update object for a forum
     * @returns the upated forum
     */
    @Patch(':id')
    @ApiOperation({ summary: "This endpoint performs partial replacement on a forum's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
        return this.forumService.patch(id, updateForumDto)
    }

    /**
     * Deletes a fourm
     * @param id the id of a forum
     * @returns the deleted forum 
     */
    @Delete(':id')
    @ApiOperation({ summary: "This endpoint deletes a forum." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    remove(@Param('id') id: string) {
        return this.forumService.remove(id)
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the collection of a forum's comments
     * @param id The id of a forum
     * @returns A collection of comments
     */
    @Get('/comments/:id')
    @ApiOperation({ summary: "This endpoint gets the comments on a forum." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getComments(@Param('id') id: string) {
        return this.forumService.getComments(id)
    }

    /**
     * Fetches the station a forum was created in
     * @param id The id of a forum
     * @returns The station a forum was created in
     */
    @Get('/station/:id')
    @ApiOperation({ summary: "This endpoint gets the station a forum was made under." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getStation(@Param('id') id: string) {
        return this.forumService.getStation(id)
    }

    /**
     * Fetches the user who created the forum
     * @param id The id of a forum
     * @returns The user who created the forum
     */
    @Get('/creator/:id')
    @ApiOperation({ summary: "This endpoint gets the creator of a forum." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getForumCreator(@Param('id') id: string) {
        return this.forumService.getForumCreator(id)
    }
}
