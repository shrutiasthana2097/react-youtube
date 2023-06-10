import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component{

    state = {
        videos:[], 
        selectedVideo: null
    };

    onTermSubmit = async (term) =>{
        const response = await youtube.get('/search',{
            params: {
                q: term,
                part: "snippet",
                maxResults: 5,
                type: 'video',
                key: 'AIzaSyADmgqdi9ahvmyeGnU0PgX-8tuyyk82hT8'
              }
        });

        console.log(response.data);
        
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    }

    onVideoSelect = (video) => {
        this.setState({
            selectedVideo: video
        });
    }
    
    componentDidMount = () =>  {
        this.onTermSubmit('USA');
    }

    render = () => {
        return(
            <div className="ui container" style={{marginTop:'20px', marginBottom:'20px'}}>
                <SearchBar onFormSubmit = {this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                           <VideoList onVideoSelect = {this.onVideoSelect} videos = {this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;