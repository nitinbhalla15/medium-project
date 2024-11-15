package org.backend.blog_server.blog_dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.backend.blog_server.blog_entities.BlogComments;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogDTO {

    private UUID blogId;
    private String blogTitle;
    private String blogDescription;

    private long blogLikeCount;
    private long blogCommentCount;

    private Date blogDate;

    private String authorEmail;
    private String authorName;
//    @JsonIgnore
//    private List<BlogComments> blogCommentsList;

}
