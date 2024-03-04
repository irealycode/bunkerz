package datastore

import "go.mongodb.org/mongo-driver/bson/primitive"

type Image struct {
	Align        string `json:"align" bson:"align"`
	BorderColor  string `json:"border_color" bson:"border_color"`
	BorderRadius int    `json:"border_radius" bson:"border_radius"`
	BorderWidth  int    `json:"border_width" bson:"border_width"`
	Size         int    `json:"size" bson:"size"`
	Color        string `json:"color" bson:"color"`
}

type Price struct {
	Color string `json:"color" bson:"color"`
	Font  string `json:"font" bson:"font"`
	Size  string `json:"size" bson:"size"`
}

type Title struct {
	Color string `json:"color" bson:"color"`
	Font  string `json:"font" bson:"font"`
	Size  int    `json:"size" bson:"size"`
}

type Product struct {
	Description   string   `json:"description" bson:"description"`
	CostPrice     string   `json:"cost_price" bson:"cost_price"`
	OriginalPrice string   `json:"original_price" bson:"original_price"`
	Price         int      `json:"price" bson:"price"`
	Files         []string `json:"files" bson:"files"`
	Size          []int    `json:"size" bson:"size"`
	Colors        []string `json:"colors" bson:"colors"`
	Quantity      float32  `json:"quantity" bson:"quantity"`
	Pid           string   `json:"pid" bson:"pid"`
	Active        bool     `json:"active" bson:"active"`
}

type BannerText struct {
	Align  string `json:"align" bson:"align"`
	Color  string `json:"color" bson:"color"`
	Font   string `json:"font" bson:"font"`
	Id     int    `json:"id" bson:"id"`
	Margin int    `json:"margin" bson:"margin"`
	Parent int    `jdon:"parent" bson:"parent"`
	Size   int    `json:"size" bson:"size"`
	Text   string `json:"text" bson:"text"`
}

type BannerImage struct {
	Align   string `json:"align" bson:"align"`
	Cheight bool   `json:"c_height" bson:"c_height"`
	Cwidth  bool   `json:"c_width" bson:"c_width"`
	Height  int    `json:"height" bson:"height"`
	Width   int    `json:"width" bson:"width"`
	Id      int    `json:"id" bson:"id"`
	Margin  int    `json:"margin" bson:"margin"`
	Parent  int    `json:"parent" bson:"parent"`
	Source  string `json:"source" bson:"source"`
}

type BannerDiv struct {
	Align      string `json:"align" bson:"align"`
	Fdirection string `json:"f_direction" bson:"f_direction"`
	Id         int    `json:"id" bson:"id"`
	MarginH    int    `json:"margin_h" bson:"margin_h"`
	Parent     int    `json:"parent" bson:"parent"`
	Show       bool   `json:"show" bson:"show"`
	Y          int    `json:"y" bson:"y"`
}

type BannerProduct struct {
	Id    int   `json:"id" bson:"id"`
	Image Image `json:"image" bson:"image"`
	Price Price `json:"price" bson:"price"`
	Show  bool  `json:"show" bson:"show"`
	Title Title `json:"title" bson:"title"`
}

type Banner struct {
	FullHeight      bool   `json:"full_height" bson:"full_height"`
	BackgroundColor string `json:"background_color" bson:"background_color"`
	EditAll         bool   `json:"edit_all" bson:"edit_all"`
	Id              int    `json:"id" bson:"id"`
	Image           Image  `json:"image" bson:"image"`
	MarginX         int    `json:"margin_x" bson:"margin_x"`
	MarginY         int    `json:"margin_y" bson:"margin_y"`
	Name            string `json:"name" bson:"name"`
	Rows            int    `json:"rows" bson:"rows"`
	Show            bool   `json:"show" bson:"show"`
	Size            int    `json:"size" bson:"size"`
	Type            string `json:"type" bson:"type"`
}

type Inner struct {
	BannerTexts    []BannerText    `json:"banner_texts" bson:"banner_texts"`
	BannerImages   []BannerImage   `json:"banner_images" bson:"banner_images"`
	BannerDivs     []BannerDiv     `json:"banner_divs" bson:"banner_divs"`
	BannerProducts []BannerProduct `json:"banner_products" bson:"banner_products"`
	Banners        []Banner        `json:"banners" bson:"banners"`
}

type Store struct {
	Id        primitive.ObjectID `json:"_id" bson:"_id"`
	Name      string             `json:"name" bson:"name"`
	Private   bool               `json:"private" bson:"private"`
	Subdomain string             `json:"subdomain" bson:"subdomain"`
	Products  []Product          `json:"products" bson:"products"`
	Inner     Inner              `json:"inner" bson:"inner"`
}
