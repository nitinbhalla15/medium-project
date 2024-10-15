package org.backend.auth_server.auth_filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class CustomJWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    //Custom JWT filter intercepting each and every request to check jwt token / authentication
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // check if request is having authorization headers -> if not redirect reuqest to next filter
        log.info("Filtering the request");
        final String reqHeaders = request.getHeader("Authorization");
        if(reqHeaders==null){
            filterChain.doFilter(request,response);
            return;
        }
        // get the bearer token from the authirization headers
        final String jwtBearerToken = (reqHeaders.startsWith("Bearer")) ? reqHeaders.substring(7) : null;
        log.info("Token separated out");
        if(jwtBearerToken!=null) {
            // Parse the jwt token to get userName -> post which will check if user exist in db for the given token
            String userName = jwtService.parseTokenToUserName(jwtBearerToken);
            if (userName != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
                // check if user has not been validated as of now and the token is valid i.e not expired
                if (userDetails!=null && !jwtService.isTokenValid(jwtBearerToken,userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,null,userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }
        filterChain.doFilter(request,response);
    }
}




