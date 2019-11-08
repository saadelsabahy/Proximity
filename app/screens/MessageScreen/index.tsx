import { useQuery } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { ThemeContext } from '../../context/ThemeContext';
import { QUERY_CHATS } from '../../graphql/query';
import { Header, ListEmptyComponent, MessageScreenPlaceholder, SearchBar } from '../../layout';
import { ThemeColors } from '../../types';
import MessageCard from './components/MessageCard';

const MessageScreen: React.FC = () => {

  const userId = 'ck2oj3x2n001w0765e34k94w1';
  const { data, loading } = useQuery(QUERY_CHATS, {
    variables: { userId }
  });
  const { theme } = useContext(ThemeContext);
  const [chatSearch, setChatSearch] = useState('');

  let content = <MessageScreenPlaceholder />;

  if (!loading) {
    const { chats } = data;
    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={chats.reverse()}
        ListEmptyComponent={() => <ListEmptyComponent listType='messages' spacing={60} />}
        style={styles().messagesList}
        spacing={20}
        renderItem={({ item }) => {

          const { id, participants, messages } = item;
          const [participant] = participants.filter(({ id }) => userId !== id);
          const [lastMessage] = messages;

          return (
            <MessageCard
              chatId={id}
              avatar={participant.avatar}
              handle={participant.handle}
              lastMessage={lastMessage.body}
              time={lastMessage.createdAt}
            />
          )
        }}
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header title='Messages' />
      <SearchBar value={chatSearch} onChangeText={setChatSearch} style={styles().chatSearchBar} />
      {content}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  chatSearchBar: {
    marginTop: 5
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 4
  }
});

export default MessageScreen;