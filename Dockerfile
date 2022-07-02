FROM roar/ui

WORKDIR /roar-ui

ADD ./roar-ui ./

# RUN npm install -g npm@8.13.2
# RUN npm install
# RUN npm install -g @angular/cli@13.3.7

EXPOSE 4200

CMD ["sh"]
