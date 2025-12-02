import { useState, useEffect, React } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import FunLoader from "../components/FunLoader";
import { GetPosts } from "../api";

const Container = styled.div`
  min-height: 100vh;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`
const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`
const Wrapper = styled.div`
  width: 100%;
  max-width: min(90vw, 2400px);
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(12px, 2vw, 24px);
  width: 100%;
`

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};

  @media (max-width: 600px) {
    font-size: 20px;
  }
`

const NoPostsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.7;
`

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setPosts(res?.data?.data);
        setFilteredPost(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPost(posts);
      return;
    }
    
    const searchLower = search.toLowerCase();
    const filteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(searchLower);
      const nameMatch = post?.name?.toLowerCase().includes(searchLower);

      return promptMatch || nameMatch;
    });

    setFilteredPost(filteredPosts);
  }, [posts, search]);

  return (
    <Container>
      <HeadLine>
        Feel free to leave your Mark on the Community!
        <Span>Generated with AI</Span>
      </HeadLine>
      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <FunLoader />
        ) :  
          filteredPost.length > 0 ? (
            <CardWrapper>
              {filteredPost
                .slice()
                .reverse()
                .map((item, index) => (
                  <ImageCard key={index} item={item} />
                ))}
            </CardWrapper>
          ) : (
            <NoPostsMessage>No posts found</NoPostsMessage>
          )
        }
      </Wrapper>
    </Container>
  );
};

export default Home
