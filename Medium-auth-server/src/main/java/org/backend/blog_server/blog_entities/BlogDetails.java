package org.backend.blog_server.blog_entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.backend.auth_server.auth_entities.SignUpDetails;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "blog_details")
public class BlogDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID blog_id;
    @NotNull(message = "BlogTitle should not be null")
    @NotBlank(message = "BlogTitle should not be blank")
    private String blogTitle;
    @NotNull(message = "BlogCategory should not be null")
    @NotBlank(message = "BlogCategory should not be blank")
    private String blogCategory;
    @NotNull(message = "BlogDescription should not be null")
    @NotBlank(message = "BlogDescription should not be blank")
    private String blogDescription;

    private Date blogDate;
    private long blogLikeCount;
    private long blogCommentCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    @JsonIgnore
    private SignUpDetails userDetails;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "blogDetails")
    private List<BlogComments> blogComments;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "blogDetails")
    private List<BlogLikes> blogLikes;

}
