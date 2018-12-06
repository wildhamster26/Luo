import React, { Component } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap'
import api from '../../api'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl'


class EditItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      categories: ["Bikes"],
      pricePerPeriod: 0,
      period: "day",
      lng: "",
      lat: "",
      message: null,
      file: null,
      dropdownCategoriesOpen: false,
      dropdownPeriodOpen: false
    }
    this.mapRef = React.createRef()
    this.map = null
    this.marker = null
  }

  toggleCategories = () => {
    this.setState(prevState => ({
      dropdownCategoriesOpen: !prevState.dropdownCategoriesOpen
    }));
  }

  togglePeriod = () => {
    this.setState(prevState => ({
      dropdownPeriodOpen: !prevState.dropdownPeriodOpen
    }));
  }

  handleInputChange = (event) => {
    let name = event.target.name
    this.setState({
      [name]: event.target.value
    }, () => {
      if (this.marker && (name === 'lat' || name === 'lng')) {
        this.marker.setLngLat([this.state.lng, this.state.lat])
      }
    })
  }

  categories = (value) => {
    let newCat = [];
    newCat.push(value);
    this.setState({
      categories: newCat
    })
  }

  period = (value) => {
    this.setState({
      period: value
    })
  }


  handleChange = (e) => {
    console.log('handleChange');
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }

  handleClick(e) {
    e.preventDefault()
    // console.log(this.state.name, this.state.description)
    let data = {
      name: this.state.name,
      description: this.state.description,
      categories: this.state.categories,
      pricePerPeriod: this.state.pricePerPeriod,
      period: this.state.period,
      lng: this.state.lng,
      lat: this.state.lat,
    }
    api.editItem(this.props.match.params.itemId, data)
      .then(result => {
        console.log("result before image upload:", result)
        if(this.state.file) {
          api.addItemPicture(this.state.file, result.data._id)
          .then(res => {
            this.props.history.push("/");
          })
        } else {
          this.props.history.push("/");
        }
      })
      
      .catch(err => this.setState({ message: err.toString() }));
  }
  componentDidMount() {
    api.getItemById(this.props.match.params.itemId)
    .then(data => {
      console.log("item is:", data.item)
      this.setState(() => {
        return {
          name: data.item.name,
          imgPath: data.item.imgPath,
          description: data.item.description,
          categories: data.item.categories[0],
          pricePerPeriod: data.item.pricePerPeriod,
          period: data.item.period,
          lng: data.item.location.coordinates[0],
          lat: data.item.location.coordinates[1]
        }
        })
        this.initMap(this.state.lng, this.state.lat)
      })
      .catch(err => console.log(err))
  }
  initMap(lng, lat) {
    // Init the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom: 13
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map
    this.marker = new mapboxgl.Marker({ color: 'red', draggable: true })
      .setLngLat([lng, lat])
      .addTo(this.map)

    // Trigger a function every time the marker is dragged
    this.marker.on('drag', () => {
      let {lng,lat} = this.marker.getLngLat()
      // console.log('DEBUG lng, lat', lng, lat)
      this.setState({
        lng,
        lat
      })
    })
  }
  render() {
    return (
      <Container className="AddItem">
        <h2>Edit Item</h2>

        <Row>
          <Col md={6}>
            <Form>
              <FormGroup row>
                <Label for="name" xl={3}>name</Label>
                <Col xl={9}>
                  <Input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row className="user-img">
                  <Label for="file"><img src={this.state.imgPath} width="200px" alt="Item"/></Label>
                  <Input type="file" name="file" id="file" className="input-file" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup row>
                <Label for="description" xl={3}>Description</Label>
                <Col xl={9}>
                  <Input type="textarea" value={this.state.description} name="description" cols="30" rows="10" onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xl={9}>
                Category:
                <Dropdown direction="right" isOpen={this.state.dropdownCategoriesOpen} toggle={this.toggleCategories}  name="period">
                  <DropdownToggle caret>
                  {console.log("From form:", this.state.categories)}
                    {this.state.categories}
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem onClick={() => this.categories("Bikes")}>Bikes</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Books")}>Books</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Clothes")}>Clothes</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Computers")}>Computers</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Gardening")}>Gardening</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Kitchen")}>Kitchen</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Sports")}>Sports</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Tools")}>Tools</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Toys")}>Toys</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.categories("Others")}>Others</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="pricePerPeriod" xl={3}>Price</Label>
                <Col xl={9}>
                  <Input type="number" value={this.state.pricePerPeriod} name="pricePerPeriod" onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xl={9}>
                Per:
                <Dropdown direction="right" isOpen={this.state.dropdownPeriodOpen} toggle={this.togglePeriod}  name="period">
                  <DropdownToggle caret>
                    {this.state.period}
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem onClick={() => this.period("hour")}>Hour</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.period("day")}>Day</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.period("month")}>Month</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </Col>
              </FormGroup>
              {/* <FormGroup row>
                <Label for="image" xl={3}>Image</Label>
                <Col xl={9}>
                  <Input type="file" name="image" onChange={this.handleChange} />
                </Col>
              </FormGroup> */}
              <FormGroup row>
                <Label for="name" xl={3}>Longitude/Latitude</Label>
                <Col xl={9}>
                  <Row>
                    <Col sm={6}>
                      <Input type="number" value={this.state.lng} name="lng" onChange={this.handleInputChange} />
                    </Col>
                    <Col sm={6}>
                      <Input type="number" value={this.state.lat} name="lat" min="-90" max="90" onChange={this.handleInputChange} />
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xl={{ size: 9, offset: 3 }}>
                  <Button color="primary" onClick={(e) => this.handleClick(e)}>Edit item</Button>
                </Col>
              </FormGroup>

            </Form>
          </Col>
          <Col md={6}>
            <div className="map" ref={this.mapRef} style={{ height: '100%', minHeight: 400 }}></div>
          </Col>
        </Row>

        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </Container>
    )
  }
}

export default EditItem;
