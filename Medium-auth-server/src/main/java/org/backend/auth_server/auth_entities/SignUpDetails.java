package org.backend.auth_server.auth_entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.backend.blog_server.blog_entities.BlogComments;
import org.backend.blog_server.blog_entities.BlogDetails;
import org.backend.blog_server.blog_entities.BlogLikes;
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
    @NotNull(message = "Email field should not be null")
    @NotBlank(message = "Email field should not be blank")
    @Email(message = "Email field has to be a valid email id")
    @Column(unique = true)
    private String email;
    @NotBlank(message = "Password name should not be blank")
    @NotNull(message = "Password name should not be null")
    private String password;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "userDetails")
    @JsonIgnore
    private List<BlogDetails> blogDetails;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "userDetails")
    @JsonIgnore
    private List<BlogComments> blogComments;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "userDetails")
    @JsonIgnore
    private List<BlogLikes> blogLikes;




    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
