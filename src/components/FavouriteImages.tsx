import React, { FC } from 'react'
import styled from '@emotion/styled'

// Components
import Heart from './icons/Icon'
import Favourite from './icons/Favourite'

export type Props = {
  favourites: string[]
  addFavourites: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    dogImageLink: string,
  ) => void
}

const FavouriteImages: FC<Props> = ({ favourites, addFavourites }) => {
  return (
    <Container>
      <Header>
        <Heart icon="redHeartIcon" alt="red heart icon" />
        <Title>Favorites</Title>
      </Header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ImageContainer>
          {favourites &&
            favourites.map((favourite, index) => (
              <ImageDiv key={`${favourite}-${index}`}>
                <img src={favourite} />
                <Favourite
                  onFavourite={(e) => addFavourites(e, favourite)}
                  icon="redHeartIcon"
                  alt="red heart icon"
                />
              </ImageDiv>
            ))}
        </ImageContainer>
      </div>
    </Container>
  )
}

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  textAlign: 'left',
  marginBottom: '40px',
})

const Header = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginLeft: '10px',
})

const Title = styled.h1({
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '33px',
  marginLeft: '10px',
})

const ImageContainer = styled.div({
  marginTop: '20px',
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
  gap: '30px',
})

const ImageDiv = styled.div({
  position: 'relative',
  width: '150px',
  height: '150px',
  borderRadius: '7px',
})

export default FavouriteImages
