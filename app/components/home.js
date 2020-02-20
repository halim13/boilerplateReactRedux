import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import axios from 'axios';

import {addData} from '../actions';
import Data from '../instructions';

export default function Home(props) {
  const dispatch = useDispatch();
  // 1 - declare variables
  const [isFetching, setIsFetching] = useState(false);

  // 2 - main code begin here
  useEffect(() => getData(), []);

  // 3 - get flatlist data
  const getData = () => {
    setIsFetching(true);
    // option 1 - local data using instruction.json file
    // delay the retrieval [sample reason only]
    setTimeout(() => {
      const data = Data.instructions;
      dispatch(addData(data));
      setIsFetching(false);
    }, 2000);

    // option 2 - api call
    // let url =
    //   'https://my-json-server.typicode.com/mesandigital/demo/instructions';
    // axios
    //   .get(url)
    //   .then(res => res.data)
    //   .then(data => dispatch(addData(data)))
    //   .catch(error => alert(error.message))
    //   .finally(() => setIsFetching(false));
  };

  // 4 - render flatlist item
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {parseInt(index) + 1}
          {'. '}
          {item.title}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  // 5 - render
  if (isFetching) {
    return (
      <View style={styles.ActivityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20}}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `Flat_${index}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ActivityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
});
