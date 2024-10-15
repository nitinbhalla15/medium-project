package org.backend.blog_server.blog_entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.backend.auth_server.auth_entities.SignUpDetails;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BlogComments {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID commentId;
    @NotNull(message = "Comment should not be null")
    @NotBlank(message = "Comment Should not be blank")
    private String commentDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id")
    @JsonIgnore
    private BlogDetails blogDetails;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private SignUpDetails userDetails;

}
