/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      page: 1,
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData = async() => {
    const url = 'http://jsonplaceholder.typicode.com/photos?_limit=10&_page=' + this.state.page;
    fetch(url)
    .then((response)=> response.json())
    .then(responseJson => {
      this.setState({
        data: this.state.data.concat(responseJson),
      });
    });
  }
  renderRow = ({item}) => {
    return (
      <View style ={styles.item}>
        <Image source = {{uri: item.thumbnailUrl}} style= {styles.itemImage}/>
        <Text style = {styles.itemText}>{item.title}</Text>
        <Text style = {styles.itemText}>{item.id}</Text>
      </View>

    );
  }

  handleLoadMore = () => {
    console.log('test')
    this.setState({
      page: this.state.page + 1,
    });

    this.getData();
  }

  render() {

    // onEndReached function
    // Called when all rows have been rendered and the list has been scrolled to within onEndReachedThreshold of the bottom. The native scroll event is provided.
    
    // onEndReachedThreshold number
    // Threshold in pixels (virtual, not physical) for calling onEndReached.

    // So as I see it: if you do onEndReachedThreshold ={10} it calls onEndReached if you scrolled to 10 pixels from the bottom
    
    return <FlatList
      data={this.state.data} 
      style={styles.container} 
      renderItem= {this.renderRow}
      keyExtractor = {(item,index) => index.toString()}
      onEndReached = {this.handleLoadMore}
      onEndReachedThreshold = {10}
    />;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  item: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemText: { 
    fontSize: 16,
    padding: 5,
  },
});
