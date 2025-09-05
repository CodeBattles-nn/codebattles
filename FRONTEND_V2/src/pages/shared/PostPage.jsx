import Card from "../../components/bootstrap/Card.jsx";
import {useEffect} from "react";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Markdown from "../../components/wraps/Markdown.jsx";

export const PostPage = () => {
  const {t} = useTranslation();
  const {postId} = useParams();
  const [post, updateData] = useCachedGetAPI(`/api/posts/${postId}`);


  useEffect(() => {
    updateData();
  }, []);


  return (
    <>
      <UserLoginRequired/>

      <Card>
        <h1>{post.title}</h1>
      </Card>

      <Card>
        <Markdown text={post.content}/>
      </Card>
    </>
  );
};