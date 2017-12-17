import React, { Component } from "react"
import classNames           from "classnames"
import ScoreSearch          from "./ScoreSearch"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"

export default class Search extends Component {
  constructor(props) {
    super(props)
    const { type, query } = props.match.params
    this.state = { type, query, result: "", loading: true }
    if (type && query) this.handleSearch(type, query)
  }
  handleSearch = (type, query) => (
    api.searchScore(
      { query },
      (success) => this.setState({ result: success.data, loading: false }),
      () => this.props.history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
    )
  )
  handlePush = (type, query) => this.props.history.push(path.search(type, query))
  handleInputQuery = (e) => this.setState({ query: e.target.value })
  handleChangeType = (type) => {
    this.setState({ type })
    this.handlePush(type, this.state.query)
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 13) this.handlePush(this.state.type, this.state.query)
  }

  render() {
    const { type, query, result, loading } = this.state
    const buttonClass = (target) => classNames("button", {
      "is-info":      type === target,
      "is-selected:": type === target
    })
    return (
      <div className={classNames("search", { "loading-wrapper": loading })}>
        <div className="field is-grouped">
          <div className="control has-icons-left">
            <span className="icon is-left can-click" role="presentation" onClick={this.handleSearch}>
              <i className="fa fa-search" />
            </span>
            <input
              className="input"
              type="text"
              placeholder="search..."
              value={query}
              onChange={this.handleInputQuery}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="control search-type">
            <div className="buttons has-addons">
              <button className={buttonClass("scores")} onClick={() => this.handleChangeType("scores")}>
                <span className="icon">
                  <i className="fa fa-file-text" />
                </span>
                <span className="is-hidden-mobile">scores</span>
              </button>
              <button className={buttonClass("users")} onClick={() => this.handleChangeType("users")}>
                <span className="icon">
                  <i className="fa fa-user" />
                </span>
                <span className="is-hidden-mobile">users</span>
              </button>
            </div>
          </div>
          <div className="control hits is-hidden-mobile">
            <strong>{result.length}</strong>
            <span>Hits</span>
          </div>
        </div>

        <div className="is-only-mobile">
          <div className="control hits">
            <strong>{result.length}</strong>
            <span>Hits</span>
          </div>
        </div>

        {type === "scores" && result && (
          <ScoreSearch scores={result} />
        )}
      </div>
    )
  }
}