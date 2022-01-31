import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  color1: "#202020",
  color2: "#000000",
  colortext: "#FFFFFF",
  colortext2: "  #AEAEAE",

  cardBackground:
    "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(180deg, rgba(114, 114, 114, 0.26) -60%, rgba(87, 87, 87, 0.76) -26.67%, rgba(71, 71, 71, 0.93) 10.83%, #2D2D2D 40%);",
  boxShadow: "0px 5px 10px 2px rgb(24, 24, 24)",
  navBar: "#202020",
  opacity: "0.9",
  copete: "#AEAEAE",
  categoryText: "#FFFFFF",
  categoryCardBackground:
    "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(180deg, rgba(114, 114, 114, 0.75) -60%, rgba(87, 87, 87, 0.85) -26.67%, rgba(71, 71, 71, 0.95) 10.83%, #2D2D2D 40%)",
  categoriesCardText: "#FEFEFE",
  categoriesCardTextSpan: "#AEAEAE",
  colorbordes: "rgb(60 60 60)",
};

export const lightTheme = {
  color1: "#FFFFFF",
  color2: "rgba(236,236,236,1)",
  colortext: "#383838",
  colortext2: "#5B5B5B",
  cardBackground: "#E3E3E3",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  navBar: "#EAEAEA",
  opacity: "0.9",
  copete: "#4D4D4D",
  categoryCardBackground: "#E3E3E3",
  categoryText: "#383838",
  categoriesCardTextSpan: "#5B5B5B",
  categoriesCardText: "#383838",
  colorbordes: "rgb(202, 202, 202)",
};

export const GlobalStyles = createGlobalStyle`
    body {
        
        background-color: ${(props) => props.theme.color1}
    }
    .navbar-items { 
        background-color: ${(props) => props.theme.color1}
    }
    .navbar-info { 
        background-color: ${(props) => props.theme.color1}
    }
    .navbar-info { 
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    
    .navbar-info p{
        color: ${(props) => props.theme.colortext}
    }
    .dia-info{
        color: '${(props) => props.theme.colorte}'
    }
    .menu-icon{
        color: ${(props) => props.theme.colortext}
    }
    .search{
        color: ${(props) => props.theme.colortext}
    }
    .title {
        color: ${(props) => props.theme.colortext}
    }


    .card-info h3{
        color: ${(props) => props.theme.colortext}
    }
    .section {
        color: ${(props) => props.theme.colortext};
        border-bottom: ${(props) => props.theme.boxShadow}
    }
    .simple-card{
        background-color: ${(props) => props.theme.cardBackground};
        box-shadow: ${(props) => props.theme.boxShadow}
    }
    .simple-card h3{
        color: ${(props) => props.theme.colortext}
    }
    .navbar-opened{
        background-color: ${(props) => props.theme.navBar};
    }
    .navbar-social{

        background-color: ${(props) => props.theme.navBar};
        color: ${(props) => props.theme.colortext};
    }
    .navbar-categories{
 
        background-color: ${(props) => props.theme.navBar};
        color: ${(props) => props.theme.colortext};
    }
    .news-item {
        color: ${(props) => props.theme.colortext};
    }
    .news-item strong{
        color: ${(props) => "#BF911A"};
    }
    .card-info span{
        color: ${(props) => props.theme.copete};
    }
    .main-card{
        border: 1px solid ${(props) => props.theme.colorbordes};
    }
    .items-cat{
        border: 1px solid ${(props) => props.theme.colorbordes};
    }

   .items-cat-info{
        color: ${(props) => props.theme.colortext};
    }
    .items-cat-info span{
        color: ${(props) => props.theme.colortext2};
        
    }
    .category-text {
        color: ${(props) => props.theme.categoryText}
    }
    .category-line{
       background-color: ${(props) => props.theme.categoryText}
    }


    .categories-item-info{
        color: ${(props) => props.theme.categoriesCardText};
        
    }
    .categories-item-info span{
        color: ${(props) => props.theme.categoriesCardTextSpan}
    }
    .categories-line-wrapper h3{
         color: ${(props) => props.theme.colortext};
    }

    .recent-card{
        border: 1px solid ${(props) => props.theme.colorbordes};
        color: ${(props) => props.theme.colortext};
    }
    .recommended{
        color: ${(props) => props.theme.colortext};
    }
    .search-content-items{
                border: 1px solid ${(props) => props.theme.colorbordes};
        color: ${(props) => props.theme.colortext};
    }
    .redes{
        color: ${(props) => props.theme.colortext};
    }
    .creator-title{
        color: ${(props) => props.theme.colortext};
    }
    .creator-description{
        color: ${(props) => props.theme.colortext};
    }
    .copete{
        color: ${(props) => props.theme.colortext};
    }
    .creator{
        color: ${(props) => props.theme.colortext};
    }
    .info-cat-creator{
        color: ${(props) => props.theme.colortext};
    }

`;
