package org.backend.blog_server.blog_service;

import lombok.extern.slf4j.Slf4j;
import org.backend.auth_server.auth_entities.SignUpDetails;
import org.backend.auth_server.auth_repo.AuthRepository;
import org.backend.blog_server.blog_entities.BlogDetails;
import org.backend.blog_server.blog_repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AuthRepository userRepository;

    public Map<String,Object> registerBlog(BlogDetails blogDetails,String userEmail){
        log.info("Submitting a blog ....");
        SignUpDetails blogOwner = userRepository.findUserByEmailId(userEmail).orElse(null);
        if(blogOwner!=null){
            blogDetails.setUserDetails(blogOwner);
            blogRepository.save(blogDetails);
        }
        Map<String,Object> responseObject = new HashMap<>();
        responseObject.put("responseBody","Blog has been posted with id "+blogDetails.getBlog_id());
        return responseObject;
    }

    public Map<String,Object> fetchAllBlogs(){
        Map<String,Object> responseObject = new HashMap<>();
        responseObject.put("responseBody",blogRepository.findAll());
        return responseObject;
    }

    public Map<String,Object> updateBlogDetails(UUID blogId , BlogDetails updatedBlogDetails){
        BlogDetails oldBlog = blogRepository.findById(blogId).get();
        if(!oldBlog.getBlogCategory().equalsIgnoreCase(updatedBlogDetails.getBlogCategory())){
            oldBlog.setBlogCategory(updatedBlogDetails.getBlogCategory());
        }
        if(!oldBlog.getBlogTitle().equalsIgnoreCase(updatedBlogDetails.getBlogTitle())){
            oldBlog.setBlogTitle(updatedBlogDetails.getBlogTitle());
        }
        if(!oldBlog.getBlogDescription().equalsIgnoreCase(updatedBlogDetails.getBlogDescription())){
            oldBlog.setBlogDescription(updatedBlogDetails.getBlogDescription());
        }
        blogRepository.save(oldBlog);
        Map<String,Object> response = new HashMap<>();
        response.put("responseBody","Blog has been updated");
        return response;
    }
}
