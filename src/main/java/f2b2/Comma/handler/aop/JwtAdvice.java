package f2b2.Comma.handler.aop;

import f2b2.Comma.config.provider.JwtTokenProvider;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.handler.exception.CustomValidationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Aspect
@RequiredArgsConstructor
public class JwtAdvice {

    @Value("${jwt.secret}")
    private String secretKey;
    private String jwtToken;
    private final JwtTokenProvider jwtTokenProvider;

    @Around("execution(* f2b2.Comma.controller.*Controller.*JWT(..))")
    public Object apiAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{

        Object[] args = proceedingJoinPoint.getArgs();
        for(Object arg: args){
            if(arg instanceof HttpHeaders){
                try{
                  jwtToken = ((HttpHeaders) arg).get("Authorization").get(0);
                }
                catch (Exception e){
                  throw new CustomValidationException("Authorization이 인가되지 않았습니다.");
                }
                Claims claims;
                try {
                    claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(jwtToken).getBody();
                }
                catch (ExpiredJwtException e){
                    return new ResponseEntity<>(new CMRespDto<>(2,"토큰 기간 만류",null), HttpStatus.OK);
                }
                catch (Exception e){
                    throw new CustomValidationException("올바른 JWT 토큰이 아닙니다.");
                }

                    if (claims.get("refresh").toString().equals("false")) {
                            return proceedingJoinPoint.proceed();
                    }

                    else if(claims.get("refresh").toString().equals("true")){
                            return new ResponseEntity<>(new CMRespDto<>(1,"새로운 엑세스토큰 발행",jwtTokenProvider.createAccessToken((String)claims.get("sub"),(List<String>)claims.get("roles"),Long.parseLong(String.valueOf((Integer)claims.get("id"))))), HttpStatus.OK);
                    }
                }

            }
        return null;
        }

    }


