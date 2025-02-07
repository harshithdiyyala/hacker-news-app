export const fetchNews = async (
    page: number = 0,
    hitsPerPage: number = 20,
    query: string = ''
  ) => {

    const topStoriesResponse = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    if (!topStoriesResponse.ok) {
      throw new Error('Failed to fetch top stories');
    }
    const topStories: number[] = await topStoriesResponse.json();
  
    const start = page * hitsPerPage;
    const end = start + hitsPerPage;
    const storyIds = topStories.slice(start, end);
  
    
    const storyPromises = storyIds.map(async (id) => {
      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      if (!storyResponse.ok) {
        throw new Error(`Failed to fetch story details for ID: ${id}`);
      }
      const story = await storyResponse.json();

      return {
        objectID: story.id.toString(),
        title: story.title,
        url: story.url,
        author: story.by,
        created_at: new Date(story.time * 1000).toLocaleString(),
        upvotes: 0,
        downvotes: 0,
      };
    });
  
    let stories = await Promise.all(storyPromises);
  
    if (query) {
      stories = stories.filter((story) =>
        story.title?.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    return { hits: stories };
  };
  