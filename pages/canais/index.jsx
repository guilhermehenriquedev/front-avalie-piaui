import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import ContainerContent from "../../components/ContainerContent";
import Divider from '@mui/material/Divider';
import { Grid, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export default function RecipeReviewCard() {

    return (
        <ContainerContent title="Canais de avaliação" legend="Aqui você pode integrar seu bot com diferentes plataformas, como páginas da web, Facebook ou Twitter e muito mais.">

            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Card sx={{ width: 230, height: 200 }}>
                        <CardHeader
                            avatar={<WhatsAppIcon>R</WhatsAppIcon>}
                            title="WhatsApp"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Envie mensagens, faça ligações e compartilhe arquivos pelo WhatsApp
                            </Typography>
                        </CardContent>

                        <Divider></Divider>
                        <CardActions disableSpacing>
                            <Button variant="contained">Configurar</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item>
                    <Card sx={{ width: 230, height: 200 }}>
                        <CardHeader
                            avatar={<EmailIcon>R</EmailIcon>}
                            title="E-mail"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Envie mensagens e compartilhe arquivos pelo Email
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions disableSpacing>
                            <Box >
                                <Button variant="contained" color="primary">Configurar</Button>
                            </Box>
                        </CardActions>


                    </Card>
                </Grid>

                <Grid item>
                    <Card sx={{ width: 230, height: 200 }}>
                        <CardHeader
                            avatar={<SmsIcon>R</SmsIcon>}
                            title="SMS"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Envie mensagens e compartilhe arquivos pelo SMS
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions disableSpacing>
                            <Box >
                                <Button variant="contained" color="primary">Configurar</Button>
                            </Box>
                        </CardActions>


                    </Card>
                </Grid>

                <Grid item>
                    <Card sx={{ width: 230, height: 200 }}>
                        <CardHeader
                            avatar={<StayCurrentPortraitIcon>R</StayCurrentPortraitIcon>}
                            title="APP"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Envie mensagens e compartilhe arquivos pelo APP .
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions disableSpacing>
                            <Box >
                                <Button variant="contained" color="primary">Configurar</Button>
                            </Box>
                        </CardActions>


                    </Card>
                </Grid>

                <Grid item>
                    <Card sx={{ width: 230, height: 200 }}>
                        <CardHeader
                            avatar={<InsertEmoticonIcon>R</InsertEmoticonIcon>}
                            title="TOTEM"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Envie mensagens e compartilhe arquivos pelo TOTEM
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions disableSpacing>
                            <Box >
                                <Button variant="contained" color="primary">Configurar</Button>
                            </Box>
                        </CardActions>


                    </Card>
                </Grid>

            </Grid>


        </ContainerContent>
    );
}
