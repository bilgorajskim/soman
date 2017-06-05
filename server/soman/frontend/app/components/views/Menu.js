import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import StatCard from './../StatCard'
import MenuTable from './../menu/MenuTable'
import moment from 'moment';
import {getMenuForDate} from "../../../api/menu";
import Promise from 'bluebird';
import {take} from 'lodash/array';
import {map, shuffle} from 'lodash/collection';

class Menu extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      menu: []
    }
  }

  render () {
    let {menu} = this.state
    let contents = null
    if (!menu.length) {
      return <div className="alert alert-warning">
        Jadłospis jest pusty
      </div>
    } else {
      contents = <div className="menu">
        <MenuTable menu={menu} />
      </div>
    }

    return <div>
      <h1>Jadłospis</h1>
      {contents}
    </div>
  }

  componentDidMount () {

    let dates = []
    for (let day = 0; day <= 13; day++) {
      dates.push(moment().add(day, 'days').format('YYYY-MM-DD'))
    }
    console.log('will fetch menu for dates', dates)

    // let mockResponse = (dates) => {
    //    let elements = ['chleb', 'bułka', 'dżem'];
    //    let seps = [', ', ' oraz ', ' i ', ' a także '];
    //    let jummy = () => {
    //        let re = take(shuffle(elements), 3);
    //        let s = take(shuffle(seps), 2);
    //        return `${re[0]}${s[0]}${re[1]}${s[1]}${re[2]}`;
    //    };
    // 	return new Promise((resolve, reject) => {
    // 		resolve(dates.map(d => {
    // 		    return {
    // 		        date: d.toISOString(),
    //                breakfast: jummy(),
    //                dinner: jummy(),
    //                supper: jummy()
    //            }
    //        }));
    // 	});
    // };

    async function loadMenuForDates (dates) {
      let menu = []
      await Promise.each(dates, async date => {
        let menuForDate = await getMenuForDate(date)
        if (menuForDate === null) menuForDate = {}
        menu.push({
          ...menuForDate,
          date
        })
      })
      return menu
    }

    loadMenuForDates(dates).then((menu) => {
      console.log('menu', menu)
      this.setState({
        menu
      })
    })
  }
}

export default Menu
