package f2b2.Comma.config.provider;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

@Configuration
public class FileConfig implements WebMvcConfigurer {


    final Path FILE_ROOT = Paths.get("../../img").toAbsolutePath().normalize();
    private String connectPath = "/upload/**";
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/upload/**")
                    .addResourceLocations("file:///home/ec2-user/commaProject/img/")
                    .setCacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES));

            registry.addResourceHandler("/**/*")
                    .addResourceLocations("classpath:/static/")
                    .resourceChain(true)
                    .addResolver(new PathResourceResolver() {
                        @Override
                        protected Resource getResource(String resourcePath,
                                                       Resource location) throws IOException {
                            Resource requestedResource = location.createRelative(resourcePath);
                            return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                                    : new ClassPathResource("/static/index.html");
                        }
                    });
        }
}
