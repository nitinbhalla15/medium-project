package org.backend.blog_server.blog_entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.backend.auth_server.auth_entities.SignUpDetails;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID like_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id",referencedColumnName = "blog_id")
    @JsonIgnore
    private BlogDetails blogDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    @JsonIgnore
    private SignUpDetails userDetails;



}
