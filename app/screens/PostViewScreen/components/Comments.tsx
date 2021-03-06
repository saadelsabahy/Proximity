import React, { useContext } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { AppContext } from '../../../context';
import { ListEmptyComponent } from '../../../layout';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';
import CommentCard from './CommentCard';
import { Comment } from '../../../types/screens';

const { FontWeights, FontSizes } = Typography;

interface CommentsProps {
  comments: Comment[]
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const { theme } = useContext(AppContext);

  const renderItem = ({ item }) => {
    const {
      author: {
        id: userId,
        avatar,
        handle
      },
      body,
      createdAt
    } = item;

    return (
      <CommentCard
        userId={userId}
        avatar={avatar}
        handle={handle}
        body={body}
        time={createdAt}
      />
    );
  };

  const ListHeaderComponent = () => <Text style={[styles(theme).commentsHeader, { marginBottom }]}>Comments</Text>

  const marginBottom = comments.length === 0 ? 0 : 20;

  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      data={comments}
      renderItem={renderItem}
      style={styles().listStyle}
      ListEmptyComponent={() =>
        <ListEmptyComponent
          placeholder='Be the first one to comment'
          placeholderStyle={styles().placeholderStyle}
          spacing={10}
        />
      }
    />
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  commentsHeader: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.text01
  },
  listStyle: {
    marginBottom: 10
  },
  placeholderStyle: {
    ...FontSizes.Body
  }
});

export default Comments;