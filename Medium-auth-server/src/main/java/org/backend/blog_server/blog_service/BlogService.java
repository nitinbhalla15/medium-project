package org.backend.blog_server.blog_service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.backend.app_exception_handler.UnidentifiedError;
import org.backend.auth_server.auth_entities.SignUpDetails;
import org.backend.auth_server.auth_repo.AuthRepository;
import org.backend.blog_server.blog_dtos.BlogDTO;
import org.backend.blog_server.blog_entities.BlogComments;
import org.backend.blog_server.blog_entities.BlogDetails;
import org.backend.blog_server.blog_entities.BlogLikes;
import org.backend.blog_server.blog_repository.BlogRepository;
import org.backend.blog_server.blog_repository.CommentRepository;
import org.backend.blog_server.blog_repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AuthRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private LikeRepository likeRepository;

    public Map<String,Object> registerBlog(BlogDetails blogDetails, String userEmail) throws UnidentifiedError {
        try{
            log.info("Inside Register Blog");
            Map<String,Object> responseObject = new HashMap<>();
            SignUpDetails blogOwner = userRepository.findUserByEmailId(userEmail).orElseThrow();
            if(blogOwner!=null){
                blogDetails.setBlogDate(new Date());
                blogDetails.setBlogLikeCount(0);
                blogDetails.setBlogCommentCount(0);
                blogDetails.setUserDetails(blogOwner);
                blogRepository.save(blogDetails);
            }
            responseObject.put("responseBody","Blog has been posted with id "+blogDetails.getBlog_id());
            return responseObject;
        }catch (Exception e){
            log.error("Error while Posting a blog");
            throw new UnidentifiedError(e.getMessage());
        }
    }

    public Map<String,Object> fetchAllBlogs() throws UnidentifiedError {
        Map<String,Object> responseObject = new HashMap<>();
        //pagination needs to be added for better performance when we have huge amount of blogs in db
        try{
            List<BlogDetails> allBlogs = blogRepository.findBlogsByDescendingDate();
            List<BlogDTO> allResponseBlog = allBlogs.stream()
                    .map((item)->{
                        BlogDTO resposneBlog = BlogDTO.builder().
                                blogId(item.getBlog_id()).
                                blogTitle(item.getBlogTitle())
                                .blogDescription(item.getBlogDescription())
//                                .blogCategory(item.getBlogCategory())
                                .blogDate(item.getBlogDate())
                                .blogLikeCount(item.getBlogLikeCount())
                                .blogCommentCount(item.getBlogCommentCount())
                                .authorName(item.getUserDetails().getFirstName()+" "+item.getUserDetails().getLastName())
                                .authorEmail(item.getUserDetails().getEmail())
                                .build();
                        return resposneBlog;
                    }).toList();
            responseObject.put("responseBody",allResponseBlog);
            return responseObject;
        }catch(Exception e){
            log.error("Error while fetching blogs");
            throw new UnidentifiedError(e.getMessage());
        }

    }

//    public Map<String,Object> updateBlogDetails(UUID blogId , BlogDetails updatedBlogDetails){
//        BlogDetails oldBlog = blogRepository.findById(blogId).get();
//        if(!oldBlog.getBlogCategory().equalsIgnoreCase(updatedBlogDetails.getBlogCategory())){
//            oldBlog.setBlogCategory(updatedBlogDetails.getBlogCategory());
//        }
//        if(!oldBlog.getBlogTitle().equalsIgnoreCase(updatedBlogDetails.getBlogTitle())){
//            oldBlog.setBlogTitle(updatedBlogDetails.getBlogTitle());
//        }
//        if(!oldBlog.getBlogDescription().equalsIgnoreCase(updatedBlogDetails.getBlogDescription())){
//            oldBlog.setBlogDescription(updatedBlogDetails.getBlogDescription());
//        }
//        blogRepository.save(oldBlog);
//        Map<String,Object> response = new HashMap<>();
//        response.put("responseBody","Blog has been updated");
//        return response;
//    }

    @Transactional
    public Map<String,Object> likePost(UUID post_id , UUID user_id) throws UnidentifiedError {
        try{
            Map<String,Object> response = new HashMap<>();
            BlogDetails blog = blogRepository.findById(post_id).orElseThrow();
            // In Huge websites where there are alot of likes happening all over the world this logic can make
            // appplication down as app needs to handle this logic and hit database everytime a like has been hit so
            // in this case event driven architecture comes to picture which collects all the likes and hit the
            // database at onnce isntead of calling db again and again
            blog.setBlogLikeCount(blog.getBlogLikeCount()+1);
            blog = blogRepository.save(blog);
            SignUpDetails userDetails = userRepository.findById(user_id).orElseThrow();
            BlogLikes blogLike = BlogLikes.builder()
                    .blogDetails(blog)
                    .userDetails(userDetails)
                    .likeDate(new Date())
                    .build();
            likeRepository.save(blogLike);
            response.put("responseBody","Like Posted Successfully");
            return response;
        }catch (Exception e){
            log.error("Error while posting a like on post");
            throw new UnidentifiedError("Error while posting a like on post");
        }
    }

    @Transactional
    public Map<String,Object> commentOnPost(UUID post_id , UUID user_id , String comment) throws UnidentifiedError {
        try {
            Map<String, Object> response = new HashMap<>();
            BlogDetails blog = blogRepository.findById(post_id).orElseThrow();
            blog.setBlogCommentCount(blog.getBlogCommentCount()+1);
            SignUpDetails userDetails = userRepository.findById(user_id).orElseThrow();
            BlogComments blogCommentObject = BlogComments.builder().
                    commentDescription(comment)
                    .blogDetails(blog)
                    .userDetails(userDetails)
                    .commentDate(new Date())
                    .build();
            List<BlogComments> comments = blog.getBlogComments();
            List<Map<String,Object>> commentList = new ArrayList<>();
            commentRepository.save(blogCommentObject);
            if(comments.size()>0){
                commentList = comments.stream().map(item -> {
                    Map<String,Object> cmntItem = new HashMap<>();
                    cmntItem.put("commentDescription",item.getCommentDescription());
                    cmntItem.put("commentDate",item.getCommentDate());
                    cmntItem.put("userName",item.getUserDetails().getFirstName()+" "+item.getUserDetails().getLastName());
                    return cmntItem;
                }).toList();
            }
            response.put("responseBody", commentList);
            return response;
        }catch (Exception e){
            log.error("Error while posting comment on a post");
            throw new UnidentifiedError("Error while posting comment on a post");
        }
    }

    public Map<String,Object> getPostById(UUID post_id) throws UnidentifiedError {
        try{
            Map<String,Object> response = new HashMap<>();
            BlogDetails blogDetails = blogRepository.findById(post_id).orElseThrow();
            BlogDTO responseBlog = BlogDTO.builder().blogTitle(blogDetails.getBlogTitle())
                    .blogId(blogDetails.getBlog_id())
                            .blogDescription(blogDetails.getBlogDescription())
//                    .blogCommentsList(blogDetails.getBlogComments())
//                                    .blogCategory(blogDetails.getBlogCategory())
                                            .blogCommentCount(blogDetails.getBlogCommentCount())
                                                    .blogLikeCount(blogDetails.getBlogLikeCount())
                                                            .blogDate(blogDetails.getBlogDate())
                                                                    .authorEmail(blogDetails.getUserDetails().getEmail())
                                                                            .authorName(blogDetails.getUserDetails().getFirstName()+" "+blogDetails.getUserDetails().getLastName())
                                                                                    .build();
            response.put("responseBody",responseBlog);
            return response;
        }catch (Exception e){
            log.error("Error while fetching blog");
            throw new UnidentifiedError("Error while fetchinf a blog");
        }
    }

    public Map<String,Object> fetchAllLikes(UUID postId) throws UnidentifiedError {
        try{
            BlogDetails blogDetails = blogRepository.findById(postId).orElse(null);
            List<String> allUsers = new ArrayList<>();
            Map<String,Object> response = new HashMap<>();
            if(blogDetails!=null){
                allUsers = blogDetails.getBlogLikes().stream().map((like)->{
                    String user = like.getUserDetails().getFirstName()+" "+like.getUserDetails().getLastName();
                    return user;
                }).toList();
            }
            response.put("responseBody",allUsers);
            return response;
        }catch (Exception e){
            log.error("Error while fetching likes");
            throw new UnidentifiedError(e.getMessage());
        }

    }

    public Map<String,Object> fetchAllComments(UUID postId) throws UnidentifiedError {
        try{
            BlogDetails blogDetails = blogRepository.findById(postId).orElse(null);
            Map<String,Object> response = new HashMap<>();
            List<Map<String,Object>> commentList = new ArrayList<>();
            if(blogDetails!=null){
                List<BlogComments> comments = blogDetails.getBlogComments();
                commentList = comments.stream().map(item -> {
                    Map<String,Object> cmntItem = new HashMap<>();
                    cmntItem.put("commentDescription",item.getCommentDescription());
                    cmntItem.put("commentDate",item.getCommentDate());
                    cmntItem.put("userName",item.getUserDetails().getFirstName()+" "+item.getUserDetails().getLastName());
                    return cmntItem;
                }).toList();
            }
            response.put("responseBody",commentList);
            return response;
        }catch (Exception e){
            log.error("Error while fetching commments");
            throw new UnidentifiedError(e.getMessage());
        }

    }


    public Map<String,Object> fetchBlogSearched(String param) throws UnidentifiedError {
        try{
            Map<String,Object> respponse = new HashMap<>();
            List<BlogDetails> allBlogs = blogRepository.fetchBlogsByParam(param);
            List<BlogDTO> allResponseBlog = new ArrayList<>();
            if(allBlogs.size()>0){
                allResponseBlog= allBlogs.stream()
                        .map((item)->{
                            BlogDTO resposneBlog = BlogDTO.builder().
                                    blogId(item.getBlog_id()).
                                    blogTitle(item.getBlogTitle())
                                    .blogDescription(item.getBlogDescription())
//                                    .blogCategory(item.getBlogCategory())
                                    .blogDate(item.getBlogDate())
                                    .blogLikeCount(item.getBlogLikeCount())
                                    .blogCommentCount(item.getBlogCommentCount())
                                    .authorName(item.getUserDetails().getFirstName()+" "+item.getUserDetails().getLastName())
                                    .authorEmail(item.getUserDetails().getEmail())
                                    .build();
                            return resposneBlog;
                        }).toList();

            }
            respponse.put("responseBody",allResponseBlog);
            return respponse;
        }catch (Exception e){
            log.error("Error while fetching blogs");
            throw new UnidentifiedError(e.getMessage());
        }
    }

}
