package org.backend.blog_server.blog_dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDTO {

    @NotNull(message = "post id should not be null")
    @NotBlank(message = "post id should not be blank")
    private UUID postId;
    @NotNull(message = "user id should not be null")
    @NotBlank(message = "user id should not be blank")
    private UUID userId;
    private String comment;
}
