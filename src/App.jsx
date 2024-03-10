
import './App.css'
import ImageSlider from './components/ImageSlider'
// https://picsum.photos/v2/list?page=1&limit=5
function App() {
 

  return (
    <>
      <ImageSlider url={'https://picsum.photos/v2/list'} limit={10} />
    </>
  )
}

export default App
