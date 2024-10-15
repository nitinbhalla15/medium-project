package org.backend.blog_server.blog_controller;

import jakarta.validation.Valid;
import org.backend.auth_server.auth_entities.ResponseDto;
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

    @PostMapping(value = "/postBlog/{user_email}")
    public ResponseEntity<?> submitBlog(@PathVariable("user_email") String user_email,@Valid @RequestBody  BlogDetails blogDetails){
        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.registerBlog(blogDetails,user_email)).message("Blog has been posted successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping(value = "/fetchAllBlogs")
    public ResponseEntity<?> getAllBlogs(){
        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.fetchAllBlogs()).message("Blog details has been fetched successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PutMapping(value = "/updateBlog/{blog_id}")
    public ResponseEntity<?> udpdateBlog(@PathVariable("blog_id") UUID blogId ,@Valid @RequestBody BlogDetails updatedBlog){
        ResponseDto response = ResponseDto.builder().http_status_code(200).resposneBody(blogService.updateBlogDetails(blogId,updatedBlog)).message("Blog details has been updated successfully").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }


}
