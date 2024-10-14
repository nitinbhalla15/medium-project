package org.backend.auth_entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class SignUpDetails implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID user_id;
    @NotBlank(message = "First name should not be blank")
    @NotNull(message = "First name should not be null")
    private String firstName;
    @NotBlank(message = "Last name should not be blank")
    @NotNull(message = "Last name should not be null")
    private String lastName;
    @Email(message = "Email field has to be a valid email id")
    private String email;
    @NotBlank(message = "Password name should not be blank")
    @NotNull(message = "Password name should not be null")
    private String password;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

//    @Override
//    public String getPassword() {
//        return this.password;
//    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
