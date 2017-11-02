import React, { PureComponent } from "react"

export default class Control extends PureComponent {
  render() {
    const { label, children } = this.props
    return (
      <div className="field">
        <label className="label">
          {label}
        </label>
        <div className="control">
          {children}
        </div>
      </div>
    )
  }
}
