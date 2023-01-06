import React, { useState } from 'react'
import styled from '@emotion/styled'

// Components
import FavouriteImages from './FavouriteImages'
import Heart from './icons/Icon'
import Favourite from './icons/Favourite'

const Search = () => {
  const [searchKey, setSearchKey] = useState<string>('')
  const [dogImages, setDogImages] = useState<string[]>([])
  const [message, setMessage] = useState<string>('Search for a dog breed')
  const [favouriteImages, setFavouriteImages] = useState<string[]>([])

  const handleSubmit = async () => {
    const breeds: string[] = await fetch(`https://dog.ceo/api/breeds/list/all`)
      .then((response) => response.json())
      .then((data) => Object.keys(data.message))

    if (breeds.includes(searchKey)) {
      await fetch(`https://dog.ceo/api/breed/${searchKey}/images`)
        .then((response) => response.json())
        .then((data) => setDogImages(data.message.slice(0, 10)))
    } else {
      setMessage(`${searchKey} is not a valid breed. Please enter a valid dog breed`)
      setDogImages([])
    }
  }

  const addFavourites = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    dogImageLink: string,
  ) => {
    event.preventDefault()

    const isDogPresent: boolean = favouriteImages.includes(dogImageLink)

    if (!isDogPresent) {
      setFavouriteImages([...favouriteImages, dogImageLink])
    } else {
      setFavouriteImages(favouriteImages.filter((favourite) => favourite !== dogImageLink))
    }
  }

  return (
    <Container>
      <Wrapper>
        <Input
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
          id="search"
          name="search"
          value={searchKey}
          placeholder="Search..."
        />
        <SearchButton onClick={handleSubmit}>
          <Heart icon="searchIcon" alt="Search" />
          <span style={{ marginLeft: '5px' }}>Search</span>
        </SearchButton>
      </Wrapper>
      <ImageContainer>
        {dogImages.length > 0 ? (
          dogImages.map((dog) => (
            <ImageDiv>
              <img key={dog} src={dog} />
              <Favourite
                onFavourite={(e) => addFavourites(e, dog)}
                icon={favouriteImages.includes(dog) ? 'redHeartIcon' : 'whiteHeartIcon'}
                alt={favouriteImages.includes(dog) ? 'Favourite Dog' : 'Not Favorite Dog'}
              />
            </ImageDiv>
          ))
        ) : (
          <Title>{message}</Title>
        )}
      </ImageContainer>
      <Divider />
      <FavouriteImages favourites={favouriteImages} addFavourites={addFavourites} />
    </Container>
  )
}

const Container = styled.div({
  width: '100%',
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Wrapper = styled.div({
  width: '100%',
  display: 'flex',
  borderRadius: '10%',
})

const Title = styled.h1({
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '33px',
  textAlign: 'left',
})

const Input = styled.input({
  width: '100%',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '5px',
  paddingRight: '5px',
  borderRadius: '1%',
  backgroundColor: '#F7F7F7',
  border: 'none',
  '&:focus': {
    border: 'none',
  },
})

const SearchButton = styled.button({
  paddingLeft: '10px',
  paddingRight: '10px',
  backgroundColor: '#0794E3',
  border: 'none',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '.searchButton': {
    width: '20px',
    height: '20px',
  },
})

const ImageContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  gap: '30px',
  marginTop: '35px',
})

const ImageDiv = styled.div({
  position: 'relative',
  width: '180px',
  height: '180px',
  borderRadius: '10px',
})

const Divider = styled.div({
  width: '100%',
  marginTop: '100px',
  marginBottom: '20px',
  borderTop: '2px solid #DADADA',
})

export default Search
