package org.backend.auth_server.auth_filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTService {

    @Value("${token.secret}")
    private static String SECRET_KEY;

    //parsing the token to various claims -----

    public String parseTokenToUserName(String jwtToken){
        return parseTokenToAnyClaim(jwtToken,Claims::getSubject);
    }

    public <T> T parseTokenToAnyClaim(String jwtToken, Function<Claims,T> claimResolver){
        Claims allClaims = parseAllClaims(jwtToken);
        return claimResolver.apply(allClaims);
    }

    private Claims parseAllClaims(String jwtToken){
        return Jwts.parserBuilder()
                .setSigningKey(generateSignInKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    private Key generateSignInKey(){
        byte[] keys = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keys);
    }

    // -------------------------------------------



    // --------Token validity---------------------------------------------

    public boolean isTokenValid(String jwtToken , UserDetails userDetails){
        String userParseFromToken = parseTokenToUserName(jwtToken);
        return (userParseFromToken.equalsIgnoreCase(userDetails.getUsername()) && isTokenExpired(jwtToken)) ? true : false;
    }

    private boolean isTokenExpired(String jwtToken){
        Date expTime = parseTokenToAnyClaim(jwtToken,Claims::getExpiration);
        return expTime.before(new Date());
    }

    // ---------------------------------------------------------------



    // --------------Generating token---------------------------
    public String generateToken(String userEmail){
        return Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .setSubject(userEmail)
                .signWith(generateSignInKey())
                .compact();
    }
}
