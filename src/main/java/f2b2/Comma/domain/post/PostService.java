package f2b2.Comma.domain.post;

import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.repository.CommentRepository;
import f2b2.Comma.repository.PostRepository;
import f2b2.Comma.repository.PostStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final PostStackRepository postStackRepository;
    private final CommentRepository commentRepository;
    private final EntityManager em;
    public Post save(Post post){
        return postRepository.save(post);
    }

    public Post find(Long id){
        return postRepository.findById(id).orElseThrow(()->{
            throw new CustomException("존재하지 않는 게시글입니다.");
        });
    }
    
    public List<Post> findAll(){
       return postRepository.findAll();
    }

    public void delete(Long postId,Post post){
        postStackRepository.deletePostStack(postId);
        commentRepository.deletePostComment(postId);
        postRepository.delete(post);
    }



    public List<Post> findAll(String query, int start, int size){
        TypedQuery<Post> posts = em.createQuery(query, Post.class)
                .setFirstResult(start)
                .setMaxResults(size);
        return posts.getResultList();
    }

    public List<Post> findAllByUser(Long userId){
        return postRepository.findAllByUserId(userId);
    }

    public void viewCount(Long postId){
        postRepository.updateView(postId);
    }
}
