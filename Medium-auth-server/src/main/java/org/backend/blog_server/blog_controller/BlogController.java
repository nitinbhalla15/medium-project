package org.backend.blog_server.blog_controller;

import jakarta.validation.Valid;
import org.backend.app_exception_handler.UnidentifiedError;
import org.backend.auth_server.auth_entities.ResponseDto;
import org.backend.blog_server.blog_dtos.CommentDTO;
import org.backend.blog_server.blog_entities.BlogDetails;
import org.backend.blog_server.blog_service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/blogServer")
public class BlogController {

    @Autowired
    private BlogService blogService;

    //DONE
    @PostMapping(value = "/postBlog")
    public ResponseEntity<?> submitBlog(@RequestParam("uid") String user_email,
                                        @Valid @RequestBody BlogDetails blogDetails) throws UnidentifiedError {
        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.registerBlog(blogDetails,user_email)).message("Blog has been posted successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    //DONE
    @GetMapping(value = "/fetchAllBlogs")
    public ResponseEntity<?> getAllBlogs() throws UnidentifiedError {
        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.fetchAllBlogs()).message("Blog details has been fetched successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

//    @PutMapping(value = "/updateBlog/{blog_id}")
//    public ResponseEntity<?> udpdateBlog(@PathVariable("blog_id") UUID blogId ,@Valid @RequestBody BlogDetails updatedBlog){
//        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.updateBlogDetails(blogId,updatedBlog)).message("Blog details has been updated successfully").build();
//        return new ResponseEntity<>(response,HttpStatus.OK);
//    }


    //like route mapping
    @PostMapping(value = "/likePost")
    public ResponseEntity<?> likePost(@RequestParam("uid") UUID user_id , @RequestParam("pid") UUID post_id) throws UnidentifiedError {
        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.likePost(post_id,user_id))
                .message("Post like Successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }



    //comment route mapping
    @PostMapping(value = "/commentPost")
    public ResponseEntity<?> commentPost( @RequestBody CommentDTO cmntDetails) throws UnidentifiedError {
        ResponseDto respone = ResponseDto.builder().http_status_code(200)
                .resposneBody(blogService.commentOnPost(cmntDetails.getPostId(),cmntDetails.getUserId(),cmntDetails.getComment())).message("Comment Posted Successfully").build();
        return new ResponseEntity<>(respone,HttpStatus.OK);
    }


    //get blog by id route
    //DONE
    @GetMapping(value = "/getBlogById")
    public ResponseEntity<?> getBlogById(@RequestParam("pid") UUID post_id) throws UnidentifiedError {
        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.getPostById(post_id))
                .message("Post fetched successfuly").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping(value = "/fetchLikes")
    public ResponseEntity<?> getPostLikes(@RequestParam("pid") UUID post_id) throws UnidentifiedError {
        ResponseDto response = ResponseDto.builder().http_status_code(200)
                .resposneBody(blogService.fetchAllLikes(post_id)).message("Likes Fetched Successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping(value = "/fetchPostComments")
    public ResponseEntity<?> getPostComments(@RequestParam("pid") UUID post_id) throws UnidentifiedError {
        ResponseDto response = ResponseDto.builder().http_status_code(200)
                .resposneBody(blogService.fetchAllComments(post_id)).message("Comments Fetched Successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping(value = "/searchBlog")
    public ResponseEntity<?> searchBlogs(@RequestParam("value") String param) throws UnidentifiedError {
        ResponseDto response = ResponseDto.builder().http_status_code(200)
                .resposneBody(blogService.fetchBlogSearched(param))
                .message("Blogs Fetched !").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
