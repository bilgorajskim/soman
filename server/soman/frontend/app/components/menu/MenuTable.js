import React, {PureComponent} from 'react';
import moment from 'moment';
import {map} from 'lodash/collection';

class MenuTable extends PureComponent {
    render() {
    	let {menu} = this.props;
        return <table className="table table-bordered menu-table">
			<tbody>
			{map(menu, (menu) => {
			    let date = moment(menu.date);
			    let friendlyDate = date.format('DD.MM.YYYY');
			    let day = date.weekday();
			    let friendlyDay = '';
			    switch (day) {
                    case 0:
                        friendlyDay = 'niedziela';
                        break;
                    case 1:
                        friendlyDay = 'poniedziałek';
                        break;
                    case 2:
                        friendlyDay = 'wtorek';
                        break;
                    case 3:
                        friendlyDay = 'środa';
                        break;
                    case 4:
                        friendlyDay = 'czwartek';
                        break;
                    case 5:
                        friendlyDay = 'piątek';
                        break;
                    case 6:
                        friendlyDay = 'sobota';
                        break;
                }
        const menuDay = <div className="menu-day">
						<strong>śniadanie</strong><br />
						<p>
							{menu.breakfast || 'Nie podano'}
						</p>
						<strong>obiad</strong><br />
						<p>
							{menu.dinner || 'Nie podano'}
						</p>
						<strong>kolacja</strong><br />
						<p>
              {menu.supper || 'Nie podano'}
						</p>
        </div>;
				return <tr key={friendlyDate}>
					<th style={{width: '20%'}}>
                        {friendlyDate}<br />
                        {friendlyDay}
					</th>
					<td style={{width: '100%'}}>
            {menuDay}
					</td>
				</tr>
			})}
			</tbody>
        </table>;
    }
}

export default MenuTable;
