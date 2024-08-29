import { OverlayTrigger, Tooltip } from "react-bootstrap"

const OverlayTooltip = ({ placement, id, children, tooltipText }) => {

  return (
    <OverlayTrigger key={placement}
      placement={placement}
      overlay={
        <Tooltip id={`tooltip-${id}`}>
          {tooltipText}
        </Tooltip>
      }>
      {children}
    </OverlayTrigger>
  )
}
export default OverlayTooltip 