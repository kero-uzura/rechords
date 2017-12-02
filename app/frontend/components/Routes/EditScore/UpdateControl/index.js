import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import StatusControl        from "../../../StatusControl"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"
import * as utils           from "../../../../utils"

class UpdateControl extends Component {
  constructor() {
    super()
    this.state = { loading: false }
  }
  handleClick = () => {
    const { history, handleSetState } = this.props
    this.setState({ loading: true })
    api.updateScore(
      this.props,
      (success) => {
        const { token } = success.data
        history.push(path.score.show(token), { flash: ["success", "スコアが更新されました。"] })
      },
      (error) => {
        this.setState({ loading: false })
        handleSetState({ errors: utils.setApiErrors(error.response.data) })
      }
    )
  }
  render() {
    const { token, status, handleSetState } = this.props
    const { loading } = this.state
    const showPath = path.score.show(token)
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    return (
      <div className="score-footer">
        <StatusControl
          status={status}
          handleSetState={handleSetState}
        />
        <div className="field is-grouped" style={{ marginTop: ".7em" }}>
          <div className="control">
            <Link
              to={showPath}
              className="button is-medium"
              disabled={loading}
            >
              <span className="icon">
                <i className={iconClass} />
              </span>
              <span>cancel</span>
            </Link>
          </div>
          <div className="control">
            <a
              className="button is-primary is-medium"
              role="presentation"
              onClick={this.handleClick}
              disabled={loading}
            >
              <span className="icon">
                <i className={iconClass} />
              </span>
              <span>update</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UpdateControl)
