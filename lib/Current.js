import React from 'react';

export default class Current extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { city,
            zip,
            time,
            condition,
            temp,
            icon_url,
            icon_name,
            high,
            low } = this.props.apiData.current

    return (
      <div className="Current">
        {city}
        <br/>
        {zip}
      </div>
    )
  }

}
