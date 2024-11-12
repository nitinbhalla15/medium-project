package org.backend.auth_server.auth_entities;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginDto {

    @NotNull(message = "Username should not be null")
    @NotBlank(message = "Username should not be blank")
    @Email(message = "Username should be a proper email address",regexp = "[A-Za-z0-9\\._%+\\-]+@[A-Za-z0-9\\.\\-]+\\.[A-Za-z]{2,}")
    private String username;
    @NotNull(message = "Username should not be null")
    @NotBlank(message = "Username should not be blank")
    private String password;
}
