import { Box } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: (theme) => theme.palette.background.default,
        padding: 3,
        marginTop: 8, // Add margin-top to avoid overlap with AppBar
      }}
    >
      <Container fluid>
        <Row>
          <Col md={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Content;
