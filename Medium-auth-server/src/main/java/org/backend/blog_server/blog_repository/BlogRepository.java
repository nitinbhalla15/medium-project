package org.backend.blog_server.blog_repository;

import org.backend.blog_server.blog_entities.BlogDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BlogRepository extends JpaRepository<BlogDetails, UUID> {

    @Query(nativeQuery = true,value = "Select * from blog_details order by blog_date desc")
    List<BlogDetails> findBlogsByDescendingDate();


}
