import { Box } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        bgcolor: theme.palette.background.default,
        padding: theme.spacing(3),
        mt: theme.spacing(8), // replaces marginTop: 8 for better theme consistency
        minHeight: "100vh", // ensures full height coverage
      })}
    >
      <Container fluid>
        <Row>
          <Col xs={12} md={9}>
            <Outlet />
          </Col>

          {/* Optional Side Panel */}
          {/* <Col md={3} className="d-none d-md-block">
            <YourSidePanelComponent />
          </Col> */}
        </Row>
      </Container>
    </Box>
  );
};

export default Content;
