import React from 'react'
import CSSModules from 'react-css-modules'
import { Link, browserHistory } from 'react-router-dom'
// import styles from './style.scss'

import { loadPeopleList } from '../../actions/people'
import { getPeopleListByName } from '../../reducers/people'
// import connectReudx from '../../common/connect-redux'


import Shell from '../shell'
import Actions from '../../components/people/actions'
// import PeopleList from '../../components/people/list'

export class PeopleDetail extends React.Component {

  static mapStateToProps = (state, props) => {
    const { id } = props.match.params
    return {
      peopleList: getPeopleListByName(state, id)
    }
  }

  static mapDispatchToProps = { loadPeopleList }

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const { peopleList, loadPeopleList } = this.props
    if (!peopleList.data || peopleList.data.length == 0) {
      let result = await loadPeopleList({
        name:id,
        filters: {
          query: {
            _id: id
          }
        }
      })

      if (result && result.success) {

      }

    }
  }

  render() {

    const { peopleList } = this.props

    if (!peopleList.data || peopleList.data.length == 0) {
      return <div>Loading...</div>
    }

    const people = peopleList.data[0]

    return(<div>
      <div>
        <h1>{people.nickname}</h1>
        <div>{people.brief}</div>
        <div><img src={people.avatar_url.replace('quality/90', 'quality/200')} width="200" height="200" /></div>
        <div>id：{people._id}</div>
        <div>gender：{people.gender}</div>
        <div>禁言时间：{people.banned_to_post}</div>
        <div>blocked：{people.blocked}</div>
        <div>last_sign_at：{people.last_sign_at}</div>
        <div>nickname_reset_at：{people.nickname_reset_at}</div>
        <div>role：{people.role}</div>
        <div>block_posts_count：{people.block_posts_count}</div>
        <div>comment_count：{people.comment_count}</div>
        <div>fans_count：{people.fans_count}</div>
        <div>like_count：{people.like_count}</div>
        <div>posts_count：{people.posts_count}</div>
        <div>
          <Link to={`/posts?people_id=${people._id}`}>ta的帖子</Link>
          <Link to={`/comments?people_id=${people._id}`}>ta的评论</Link>
          <Link to={`/notifications?people_id=${people._id}`}>ta的通知</Link>
        </div>
        <Actions people={people} />
      </div>
    </div>)
  }

}

// People = CSSModules(People, styles)

export default Shell(PeopleDetail)
