import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";
import { useDispatch  } from "react-redux";
import { fetchBlogPostsAction } from "../../redux/slices/postSlice";

function Routing(props) {
  const { selectBlog, selectHome } = props;
  useLocationBlocker();


  const [blogPosts, setBlogPosts] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchBlogPostsAction()).unwrap().then((response) => {
     const posts =  response.posts.map((blogPost) => {
        let title = blogPost.title;
        console.log(title);
        title = title.toLowerCase();
        /* Remove unwanted characters, only accept alphanumeric and space */
        title = title.replace(/[^A-Za-z0-9 ]/g, "");
        /* Replace multi spaces with a single space */
        title = title.replace(/\s{2,}/g, " ");
        /* Replace space with a '-' symbol */
        title = title.replace(/\s/g, "-");
        blogPost = { ...blogPost, url: `/blog/post/${title}` };
        blogPost.params = `?id=${blogPost.id}`;
        return blogPost;
      });
      setBlogPosts(posts);
    }); 
  }, [dispatch]);


  return (
    <Switch>
      {blogPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(
            (blogPost) => blogPost.id !== post.id
          )}
        />
      ))}
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);
