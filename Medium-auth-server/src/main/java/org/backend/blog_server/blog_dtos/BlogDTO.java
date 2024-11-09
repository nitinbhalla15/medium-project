package org.backend.blog_server.blog_dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogDTO {

    private UUID blogId;
    private String blogTitle;
    private String blogDescription;
    private String blogCategory;

    private long blogLikeCount;
    private long blogCommentCount;

    private Date blogDate;

    private String authorEmail;
    private String authorName;

}
