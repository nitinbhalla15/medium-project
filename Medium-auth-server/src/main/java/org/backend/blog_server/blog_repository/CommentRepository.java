package org.backend.blog_server.blog_repository;

import org.backend.blog_server.blog_entities.BlogComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<BlogComments, UUID> {
}
